# Development stage Dockerfile for chat-service
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy all project files
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3005

# Expose the port (assuming chat service runs on 3005)
EXPOSE 3005

# Run the application in development mode
CMD ["npm", "run", "start:dev"]