# Development stage Dockerfile for payment-srv
FROM node:20-alpine

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
ENV PORT=3004

# Expose the port
EXPOSE 3004

# Run the application in development mode
CMD ["npm", "run", "start:dev"]