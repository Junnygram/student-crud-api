### Dockerizing a Student CRUD API: A Comprehensive Guide

In modern software development, creating robust APIs that can perform CRUD (Create, Read, Update, Delete) operations is essential. This guide will walk you through the process of Dockerizing a Student CRUD API using Node.js. We'll cover everything from setting up your development environment to deploying the API using Docker with best practices, including multi-stage builds and environment variable management.

#### Learning Outcomes

- Learn how to Dockerize an application.
- Understand multi-stage Dockerfile.
- Explore Dockerfile best practices.

#### Problem Statement

Create a Dockerfile for the REST API.

### Expectations

To complete this milestone, the following expectations should be met:

1. The API should be run using the Docker image.
2. The Dockerfile should have different stages to build and run the API.
3. We should be able to inject environment variables while running the Docker container at runtime.
4. The `README.md` should be updated with proper instructions to build the image and run the Docker container.
5. Similarly, appropriate make targets should be added in the `Makefile`.
6. The Docker image should be properly tagged using semver tagging. The use of the `latest` tag is heavily discouraged.
7. Appropriate measures should be taken to reduce the Docker image size to ensure a small footprint.

### Step 1: Setting Up Your Development Environment

First, let's prepare your environment by installing necessary tools and setting up the project:

```bash
sudo apt update
sudo apt install -y wget unzip nodejs npm
mkdir project
cd project/
git clone https://github.com/Junnygram/student-crud-api.git
cd student-crud-api/
npm install
```

### Step 2: Creating a Multi-Stage Dockerfile

Create a `Dockerfile` in the project root with the following content:

```Dockerfile
# Stage 1: Build
FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Stage 2: Run
FROM node:16-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["node", "server.js"]
```

### Step 3: Building and Running the Docker Image

Build the Docker image with a specific version tag:

```bash
docker build -t student-crud-api:1.0.0 .
```

Run the Docker container with environment variables:

```bash
docker run -d -p 3000:3000 --name student-crud-api -e PORT=3000 student-crud-api:1.0.0
```

### Step 4: Accessing Your API

**On AWS EC2**:
Ensure inbound rules on your EC2 instance allow traffic on port 3000. You can update these rules in the AWS EC2 console. Access the API using your EC2 instance's public IP, e.g., `http://your-ec2-public-ip:3000/api/v1/students`.

**On Killacoda**:
On Killacoda, you may need to open traffic for port 3000:
- Navigate to `Traffic` -> `Port`.
- Add `3000` to allow traffic on your server.
- Access the API using the provided public IP of your Killacoda environment, e.g., `http://your-killacoda-public-ip:3000/api/v1/students`.

### Step 5: Verifying Docker Setup

Check Docker images and verify the container is running:

```bash
docker images
docker ps
```

Use `curl` or a web browser to test the API:

```bash
curl http://localhost:3000/api/v1/students
```

### Step 6: Updating `README.md` and `Makefile`

**`README.md`**:

```markdown
## Student CRUD API

### Prerequisites

- Node.js and npm
- Docker

### Setup Instructions

1. **Clone Repository**:

   ```bash
   git clone https://github.com/Junnygram/student-crud-api.git
   cd student-crud-api
   ```

2. **Install Node.js Dependencies**:

   ```bash
   npm install
   ```

3. **Build and Run Docker Image**:

   ```bash
   docker build -t student-crud-api:1.0.0 .
   docker run -d -p 3000:3000 --name student-crud-api -e PORT=3000 student-crud-api:1.0.0
   ```

4. **Access the API**:

   - Local: `http://localhost:3000/api/v1/students`
   - AWS EC2: `http://your-ec2-public-ip:3000/api/v1/students`
   - Killacoda: `http://your-killacoda-public-ip:3000/api/v1/students`

5. **Check Docker Images and Containers**:

   ```bash
   docker images
   docker ps
   ```

### `Makefile`**:

```makefile
.PHONY: install build run clean

install:
	npm install

build:
	docker build -t student-crud-api:1.0.0 .

run:
	docker run -d -p 3000:3000 --name student-crud-api -e PORT=3000 student-crud-api:1.0.0

clean:
	docker rm -f student-crud-api
	docker rmi student-crud-api:1.0.0
```

### Conclusion

Building APIs with Node.js and Docker simplifies development workflows and enhances deployment capabilities. This guide has equipped you with the knowledge to create and deploy a Student CRUD API, leveraging the power of Docker for containerization and portability. As you continue to develop and refine your APIs, these practices will ensure scalability and maintainability in your projects.

Start building your own APIs today, and explore the possibilities of Node.js and Docker in modern application development!
