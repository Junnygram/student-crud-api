install:
	npm install

start:
	node server.js

test:
	npm test

.PHONY: build_api start_api

build_api:
	@echo "Building the REST API Docker image..."
	docker-compose build

start_api: build_api
	@echo "Starting the REST API Docker container..."
	docker-compose up
