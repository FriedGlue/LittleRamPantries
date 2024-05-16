package main

import (
	"context"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// handler is your Lambda function handler
// It uses Amazon API Gateway request/responses provided by the aws-lambda-go/events package,
// specifically the APIGatewayProxyRequest and APIGatewayProxyResponse types.
func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// Log the received request (optional)
	// fmt.Printf("Received request: %+v\n", request)

	// Return a 200 OK response with a "Hello World" message.
	return events.APIGatewayProxyResponse{
		StatusCode: http.StatusOK,
		Body:       "Hello World",
	}, nil
}

func main() {
	// Start the Lambda function handler
	lambda.Start(handler)
}
