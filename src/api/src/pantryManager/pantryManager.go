package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/expression"
)

// Pantry is used for GET and POST request
type Pantry struct {
	University        string  `json:"university"`
	SortKey           string  `json:"sortKey"`
	Campus            *string `json:"campus,omitempty"`
	Directions        *string `json:"directions,omitempty"`
	Facility          *string `json:"facility,omitempty"`
	Floor             *string `json:"floor,omitempty"`
	Hours             *string `json:"hours,omitempty"`
	LatestContentsURL *string `json:"latest_contents_url,omitempty"`
	Name              *string `json:"name,omitempty"`
	PantryExteriorURL *string `json:"pantry_exterior_url,omitempty"`
}

// PantryUpdate is Used for PUT request
type PantryUpdate struct {
	Campus            *string `json:"campus,omitempty"`
	Directions        *string `json:"directions,omitempty"`
	Facility          *string `json:"facility,omitempty"`
	Floor             *string `json:"floor,omitempty"`
	Hours             *string `json:"hours,omitempty"`
	LatestContentsURL *string `json:"latest_contents_url,omitempty"`
	Name              *string `json:"name,omitempty"`
	PantryExteriorURL *string `json:"pantry_exterior_url,omitempty"`
}

// DynamoDBClient initializes a DynamoDB client
func DynamoDBClient() *dynamodb.DynamoDB {
	sess := session.Must(session.NewSession())
	return dynamodb.New(sess)
}

// GetPantries queries a DynamoDB table using provided PathParameters
func GetPantries(request events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	university, uniExists := request.PathParameters["university"]
	sortKey, sortKeyExists := request.PathParameters["sortKey"]

	if !uniExists {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "University parameters is required",
		}
	}

	// Initialize KeyConditionExpression with only university
	keyConditionExpression := "university = :university"
	expressionAttributeValues := map[string]*dynamodb.AttributeValue{
		":university": {
			S: aws.String(university),
		},
	}

	// If sortKey is provided, adjust the query to include it
	if sortKeyExists && sortKey != "" {
		keyConditionExpression += " AND begins_with(sortKey, :sortKey)"
		expressionAttributeValues[":sortKey"] = &dynamodb.AttributeValue{S: aws.String(sortKey)}
	}

	// Initialize DynamoDB client
	svc := DynamoDBClient()

	// Prepare the query input
	input := &dynamodb.QueryInput{
		TableName:                 aws.String("LRP"),
		KeyConditionExpression:    aws.String(keyConditionExpression),
		ExpressionAttributeValues: expressionAttributeValues,
	}

	// Execute the query
	result, err := svc.Query(input)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Internal Server Error: " + err.Error(),
		}
	}

	// Check if any items were returned
	if len(result.Items) == 0 {
		return events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "No pantries found",
		}
	}

	// Map results to Pantry struct
	var pantries []Pantry
	err = dynamodbattribute.UnmarshalListOfMaps(result.Items, &pantries)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error parsing pantry data: " + err.Error(),
		}
	}

	// Convert the result to JSON
	pantriesJSON, err := json.Marshal(pantries)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error preparing response: " + err.Error(),
		}
	}

	// Return a 200 and the list of Pantries
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(pantriesJSON),
	}
}

func CreatePantry(request events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	// Parse the JSON body to the Pantry struct
	var pantry Pantry
	err := json.Unmarshal([]byte(request.Body), &pantry)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Error parsing request body: " + err.Error(),
		}
	}

	// Check for mandatory fields
	if pantry.University == "" || pantry.SortKey == "" {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Both university and sortKey fields are required",
		}
	}

	// Initialize DynamoDB client
	svc := DynamoDBClient()

	// Convert Pantry struct to map[string]*dynamodb.AttributeValue
	av, err := dynamodbattribute.MarshalMap(pantry)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error converting pantry data: " + err.Error(),
		}
	}

	// Prepare the PutItem input
	input := &dynamodb.PutItemInput{
		TableName: aws.String("LRP"),
		Item:      av,
	}

	// Execute the PutItem operation
	_, err = svc.PutItem(input)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error adding pantry to the database: " + err.Error(),
		}
	}

	// Return a success response
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Pantry added successfully",
	}
}

func UpdatePantry(request events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	university, uniExists := request.PathParameters["university"]
	sortKey, sortKeyExists := request.PathParameters["sortKey"]

	if !uniExists || !sortKeyExists {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Both university and sortKey parameters are required",
		}
	}

	// Parse the JSON body to the Pantry struct
	var pantryUpdates PantryUpdate
	err := json.Unmarshal([]byte(request.Body), &pantryUpdates)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Error parsing request body: " + err.Error(),
		}
	}

	// Convert Pantry struct to map[string]*dynamodb.AttributeValue, excluding primary keys
	updateMap, err := dynamodbattribute.MarshalMap(pantryUpdates)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error preparing update data: " + err.Error(),
		}
	}

	// Construct the update expression from the parsed body
	updateBuilder := expression.UpdateBuilder{}
	for key, val := range updateMap {
		if val.NULL == nil { // Skip if value is not set (nil)
			updateBuilder = updateBuilder.Set(expression.Name(key), expression.Value(val))
		}
	}

	expr, err := expression.NewBuilder().WithUpdate(updateBuilder).Build()
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error building update expression: " + err.Error(),
		}
	}

	svc := DynamoDBClient()

	input := &dynamodb.UpdateItemInput{
		TableName: aws.String("LRP"),
		Key: map[string]*dynamodb.AttributeValue{
			"university": {
				S: aws.String(university),
			},
			"sortKey": {
				S: aws.String(sortKey),
			},
		},
		ExpressionAttributeNames:  expr.Names(),
		ExpressionAttributeValues: expr.Values(),
		UpdateExpression:          expr.Update(),
		ReturnValues:              aws.String("UPDATED_NEW"),
	}

	_, err = svc.UpdateItem(input)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error updating pantry: " + err.Error(),
		}
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Pantry updated successfully",
	}
}

// DeletePantry deletes a pantry entry from the DynamoDB table
func DeletePantry(request events.APIGatewayProxyRequest) events.APIGatewayProxyResponse {
	university, uniExists := request.PathParameters["university"]
	sortKey, sortKeyExists := request.PathParameters["sortKey"]

	if !uniExists || !sortKeyExists {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Both university and sortKey parameters are required",
		}
	}

	svc := DynamoDBClient()

	input := &dynamodb.DeleteItemInput{
		TableName: aws.String("LRP"),
		Key: map[string]*dynamodb.AttributeValue{
			"university": {
				S: aws.String(university),
			},
			"sortKey": {
				S: aws.String(sortKey),
			},
		},
	}

	_, err := svc.DeleteItem(input)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Error deleting pantry from the database: " + err.Error(),
		}
	}

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Pantry deleted successfully",
	}
}
