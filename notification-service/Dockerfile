
# Development stage Dockerfile for notification-service
FROM node:18

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
ENV PORT=3002

# Expose the port
EXPOSE 3002

# Run the application in development mode
CMD ["npm", "run", "start:dev"]