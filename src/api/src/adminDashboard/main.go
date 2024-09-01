package main

import (
	"context"
	"log"
	"net/http"
	"net/http/httptest"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/go-chi/chi/v5"
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
	log.Printf("Received request: %v", request)

	router := chi.NewRouter()

	router.Get("/admin/{startTime}/{endTime}", usageGraphHandler)
	router.Get("/admin/poll", serviceBusHandler)

	responseWriter := httptest.NewRecorder()
	req, err := http.NewRequest(request.HTTPMethod, request.Path, nil)
	if err != nil {
		log.Printf("Error creating new request: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: http.StatusInternalServerError}, err
	}

	router.ServeHTTP(responseWriter, req)

	response := events.APIGatewayProxyResponse{
		StatusCode: responseWriter.Code,
		Body:       responseWriter.Body.String(),
		Headers:    map[string]string{},
	}

	for k, v := range responseWriter.Header() {
		response.Headers[k] = v[0]
	}

	log.Printf("Response: %v", response)
	return addCORSHeaders(response), nil
}

func main() {
	log.Println("Starting Lambda function")
	lambda.Start(handler)
}
