# Stage 1: Build the application
FROM node:14-alpine AS build
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build
# Stage 2: Create the final image
FROM node:14-alpine
WORKDIR /app
# Copy built artifacts from the build stage
COPY - from=build /app /app
# Install only production dependencies
RUN npm install - only=production
# Expose the application port
EXPOSE 3000
# Command to run the application
CMD ["node", "dist/index.js"]
