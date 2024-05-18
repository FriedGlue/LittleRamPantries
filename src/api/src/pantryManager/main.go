package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func addCORSHeaders(response events.APIGatewayProxyResponse) events.APIGatewayProxyResponse {
	if response.Headers == nil {
		response.Headers = map[string]string{}
	}
	response.Headers["Access-Control-Allow-Origin"] = "*"
	response.Headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
	response.Headers["Access-Control-Allow-Headers"] = "Content-Type"
	return response
}

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var response events.APIGatewayProxyResponse

	switch request.HTTPMethod {
	case "GET":
		response = GetPantries(request)
	case "POST":
		response = CreatePantry(request)
	case "PUT":
		response = UpdatePantry(request)
	case "DELETE":
		response = DeletePantry(request)
	default:
		response = events.APIGatewayProxyResponse{
			StatusCode: 405,
			Body:       "Method Not Allowed",
		}
	}

	return addCORSHeaders(response), nil
}

func main() {
	lambda.Start(handler)
}
