
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


# Define environment variables
# ENV PORT=3000

CMD ["node", "server.js"]
