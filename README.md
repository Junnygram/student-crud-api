# Student CRUD API

This repository contains a CRUD API for managing student records.

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Docker (for Docker setup)

### Step-by-Step Setup

1. **Install Dependencies**

   Update package list and install necessary tools:

   ```bash
   sudo apt update
   sudo apt install -y wget unzip nodejs npm
   ```

2. **Clone Repository**

   Clone the project repository from GitHub:

   ```bash
   mkdir project
   cd project/
   git clone https://github.com/Junnygram/student-crud-api.git
   cd student-crud-api/
   ```

3. **Install Node.js Dependencies**

   Install Node.js dependencies using npm:

   ```bash
   npm install
   ```

4. **Start the Application**

   Start the Node.js application:

   ```bash
   npm start
   ```

   The API will be accessible at `http://localhost:3000/api/v1/students`.

5. **Setup Docker (if applicable)**

   If you prefer Docker, follow these steps:

   ```bash
   cd ~/student-crud-api
   sudo systemctl start docker  # Start Docker service if not already started
   docker build -t student-crud-api .
   docker run -d -p 3000:3000 --name student-crud-api student-crud-api
   ```

   Replace `student-crud-api` with your preferred Docker image name.

6. **Accessing the API**

   Ensure that inbound rules on your EC2 instance allow traffic on port 3000. You can update these rules in the AWS EC2 console.

   - **Killacoda**: Open the terminal and navigate to `Traffic` -> `Port`. Add `3000` to allow traffic on your server.

   - Use the public IP of your EC2 instance followed by `/api/v1/students` to access the API, e.g., `http://your-ec2-public-ip:3000/api/v1/students`.

7. **Verify Docker Setup**

   Check Docker images and verify the container is running:

   ```bash
   docker images
   docker ps
   ```

   Use `curl` or a web browser to test the API:

   ```bash
   curl http://localhost:3000/api/v1/students
   ```

---

Make sure to replace placeholders like `your-ec2-public-ip` with actual values relevant to your setup. This README should guide users through setting up and running your student CRUD API both with Node.js directly and with Docker. Adjust any specific details or commands based on your project's requirements and configurations.
