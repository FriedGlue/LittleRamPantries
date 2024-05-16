package main

import (
	"context"
	"fmt"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/rekognition"
)

type S3Event struct {
	Records []struct {
		S3 struct {
			Bucket struct {
				Name string
			}
			Object struct {
				Key string
			}
		}
	}
}

type ImageAnalysisResult struct {
	Location  string
	Timestamp int64
	Labels    map[string]int
	Unique    string
}

func fetchLatestResult(dynamoSvc *dynamodb.DynamoDB, location string, currentTime int64) (*ImageAnalysisResult, error) {
	input := &dynamodb.QueryInput{
		TableName:              aws.String("ImageAnalysisResultsTable"),
		KeyConditionExpression: aws.String("#loc = :loc AND #ts < :t"),
		ExpressionAttributeNames: map[string]*string{
			"#loc": aws.String("Location"),  // Using an expression attribute name for the reserved keyword
			"#ts":  aws.String("Timestamp"), // Good practice to also use it for sort key
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":loc": {S: aws.String(location)},
			":t":   {N: aws.String(fmt.Sprintf("%d", currentTime))},
		},
		ScanIndexForward: aws.Bool(false), // False to sort by Timestamp in descending order
		Limit:            aws.Int64(1),
	}

	result, err := dynamoSvc.Query(input)
	if err != nil {
		return nil, err
	}

	if len(result.Items) == 0 {
		return nil, nil // No previous data
	}

	var lastResult ImageAnalysisResult
	err = dynamodbattribute.UnmarshalMap(result.Items[0], &lastResult)
	if err != nil {
		return nil, err
	}

	return &lastResult, nil
}

func labelsAreDifferent(newLabels, oldLabels map[string]int) bool {
	if len(newLabels) != len(oldLabels) {
		return true
	}
	for key, newCount := range newLabels {
		if oldCount, ok := oldLabels[key]; !ok || oldCount != newCount {
			return true
		}
	}
	return false
}

func Handler(ctx context.Context, event S3Event) {
	sess := session.Must(session.NewSession())
	rekognitionSvc := rekognition.New(sess)
	dynamoSvc := dynamodb.New(sess)

	currentTime := time.Now().Unix()

	for _, record := range event.Records {
		bucket := record.S3.Bucket.Name
		key := record.S3.Object.Key
		location := key // Assuming the file name is the location name

		// Call Rekognition to detect labels
		input := &rekognition.DetectLabelsInput{
			Image: &rekognition.Image{
				S3Object: &rekognition.S3Object{
					Bucket: &bucket,
					Name:   &key,
				},
			},
			MaxLabels:     aws.Int64(10),
			MinConfidence: aws.Float64(75.0),
		}

		rekognitionResult, err := rekognitionSvc.DetectLabels(input)
		if err != nil {
			fmt.Println("Error calling DetectLabels:", err)
			continue
		}

		newLabels := make(map[string]int)
		for _, label := range rekognitionResult.Labels {
			newLabels[*label.Name] = len(label.Instances)
		}

		lastResult, err := fetchLatestResult(dynamoSvc, location, currentTime)
		if err != nil {
			fmt.Println("Error fetching last result:", err)
			continue
		}

		isUnique := true
		if lastResult != nil {
			isUnique = labelsAreDifferent(newLabels, lastResult.Labels)
		}

		// Log every interaction, unique or not
		newItem := ImageAnalysisResult{
			Location:  location,
			Timestamp: currentTime,
			Labels:    newLabels,
			Unique:    fmt.Sprintf("%v", isUnique), // Store "true" or "false" as string,
		}
		av, err := dynamodbattribute.MarshalMap(newItem)
		if err != nil {
			fmt.Println("Error marshalling new result:", err)
			continue
		}

		inputDDB := &dynamodb.PutItemInput{
			TableName: aws.String("ImageAnalysisResultsTable"),
			Item:      av,
		}

		_, err = dynamoSvc.PutItem(inputDDB)
		if err != nil {
			fmt.Println("Error calling PutItem:", err)
			continue
		}
	}
}

func main() {
	lambda.Start(Handler)
}
