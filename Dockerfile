# Use the official Node.js image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variables
ENV PORT=3000

# Command to run the application
CMD ["node", "server.js"]
