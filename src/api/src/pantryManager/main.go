package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	switch request.HTTPMethod {
	case "GET":
		return GetPantries(request), nil
	case "POST":
		return CreatePantry(request), nil
	case "PUT":
		return UpdatePantry(request), nil
	case "DELETE":
		return DeletePantry(request), nil
	default:
		return events.APIGatewayProxyResponse{
			StatusCode: 405,
			Body:       "Method Not Allowed",
		}, nil
	}
}

func main() {
	lambda.Start(handler)
}
