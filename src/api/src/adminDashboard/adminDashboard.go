package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/sqs"
	"github.com/go-chi/chi/v5"
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

func pollServiceBus(serviceBusSvc *sqs.SQS) (*sqs.Message, error) {
	log.Println("Polling service bus for messages")
	input := &sqs.ReceiveMessageInput{
		MaxNumberOfMessages: aws.Int64(1),
		QueueUrl:            aws.String("https://sqs.us-east-1.amazonaws.com/499182923302/vcu-pi-pipeline-dev.fifo"),
	}

	result, err := serviceBusSvc.ReceiveMessage(input)
	if err != nil {
		log.Printf("Error receiving message: %v", err)
		return nil, err
	}

	if len(result.Messages) == 0 {
		log.Println("No messages received")
		return nil, nil // no messages received
	}

	// process the received messages
	message := result.Messages[0]
	log.Printf("Message received: %v", *message.Body)
	return message, nil
}

func performScan(dynamoSvc *dynamodb.DynamoDB, startDate, endDate int64) ([]UsageData, error) {
	log.Printf("Performing scan from %d to %d", startDate, endDate)
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
		log.Printf("Error scanning DynamoDB: %v", err)
		return nil, err
	}

	var usageData []UsageData
	for _, item := range result.Items {
		var record ImageAnalysisResult
		err = dynamodbattribute.UnmarshalMap(item, &record)
		if err != nil {
			log.Printf("Error unmarshalling item: %v", err)
			return nil, err
		}

		// Process the record and append to usageData
		usageData = append(usageData, UsageData{
			Date:  strconv.FormatInt(record.Timestamp, 10),
			Count: record.Labels["someLabel"], // Adjust this based on your actual label processing logic
		})
	}

	log.Printf("Scan completed with %d items", len(usageData))
	return usageData, nil
}

func serviceBusHandler(w http.ResponseWriter, r *http.Request) {

	sess := session.Must(session.NewSession())
	sqs := sqs.New(sess)

	result, err := pollServiceBus(sqs)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": *result.Body})
}

func usageGraphHandler(w http.ResponseWriter, r *http.Request) {
	startTimeStr := chi.URLParam(r, "startTime")
	endTimeStr := chi.URLParam(r, "endTime")

	startTime, err := strconv.ParseInt(startTimeStr, 10, 64)
	if err != nil {
		http.Error(w, "Invalid start time", http.StatusBadRequest)
		return
	}

	endTime, err := strconv.ParseInt(endTimeStr, 10, 64)
	if err != nil {
		http.Error(w, "Invalid end time", http.StatusBadRequest)
		return
	}

	sess := session.Must(session.NewSession())
	dynamoSvc := dynamodb.New(sess)

	usageData, err := performScan(dynamoSvc, startTime, endTime)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(usageData)
}
