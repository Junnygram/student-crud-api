install:
	npm install

start:
	node server.js

test:
	npm test

.PHONY: build_api test_api lint_api docker_build docker_push

build_api:
	@echo "Building the REST API Docker image..."
	docker-compose build

test_api:
	@echo "Running tests..."
	# Add your test commands here
	docker-compose run api npm test

lint_api:
	@echo "Performing code linting..."
	# Add your linting commands here
	docker-compose run api npm run lint

docker_build: build_api
	@echo "Building Docker image..."
	docker build -t your_dockerhub_username/student-crud-api:latest .

docker_push: docker_build
	@echo "Pushing Docker image to registry..."
	docker login -u $(DOCKER_USERNAME) -p $(DOCKER_PASSWORD)
	docker push your_dockerhub_username/student-crud-api:latest
