package main

import (
	"context"
	"encoding/json"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type UsageData struct {
	Date  string `json:"date"`
	Count int    `json:"count"`
}

type ImageAnalysisResult struct {
	Location  string
	Timestamp int64
	Labels    map[string]int
	Unique    string
}

func performScan(dynamoSvc *dynamodb.DynamoDB, startDate, endDate int64) ([]UsageData, error) {
	input := &dynamodb.ScanInput{
		TableName:        aws.String("ImageAnalysisResultsTable"),
		FilterExpression: aws.String("#ts BETWEEN :start AND :end"),
		ExpressionAttributeNames: map[string]*string{
			"#ts": aws.String("Timestamp"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":start": {N: aws.String(strconv.FormatInt(startDate, 10))},
			":end":   {N: aws.String(strconv.FormatInt(endDate, 10))},
		},
	}

	result, err := dynamoSvc.Scan(input)
	if err != nil {
		return nil, err
	}

	usageMap := make(map[string]int)
	for _, item := range result.Items {
		var record ImageAnalysisResult
		err = dynamodbattribute.UnmarshalMap(item, &record)
		if err != nil {
			return nil, err
		}

		date := time.Unix(record.Timestamp, 0).Format("2006-01-02")
		usageMap[date]++
	}

	var usageData []UsageData
	for date, count := range usageMap {
		usageData = append(usageData, UsageData{Date: date, Count: count})
	}

	// Sort usageData slice by date
	sort.Slice(usageData, func(i, j int) bool {
		return usageData[i].Date < usageData[j].Date
	})

	return usageData, nil
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	startTimeStr, ok := request.PathParameters["startTime"]
	endTimeStr, ok2 := request.PathParameters["endTime"]
	if !ok || !ok2 {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       "Missing start or end time parameters",
			Headers: map[string]string{
				"Access-Control-Allow-Origin": "*", // Allows all domains, adjust as necessary for security
			},
		}, nil
	}

	startTime, err := time.Parse("2006-1-2", startTimeStr)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       "Invalid start time parameter",
			Headers: map[string]string{
				"Access-Control-Allow-Origin": "*",
			},
		}, nil
	}

	endTime, err := time.Parse("2006-1-2", endTimeStr)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusBadRequest,
			Body:       "Invalid end time parameter",
			Headers: map[string]string{
				"Access-Control-Allow-Origin": "*",
			},
		}, nil
	}

	// Include the entire end date by setting the time to 23:59:59
	endTime = endTime.Add(23*time.Hour + 59*time.Minute + 59*time.Second)

	startUnix := startTime.Unix()
	endUnix := endTime.Unix()

	sess := session.Must(session.NewSession())
	dynamoSvc := dynamodb.New(sess)
	usageData, err := performScan(dynamoSvc, startUnix, endUnix)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       err.Error(),
			Headers: map[string]string{
				"Access-Control-Allow-Origin": "*",
			},
		}, nil
	}

	responseBody, _ := json.Marshal(usageData)
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       string(responseBody),
		Headers: map[string]string{
			"Access-Control-Allow-Origin": "*", // Necessary for CORS
		},
	}, nil
}

func main() {
	lambda.Start(handler)
}
