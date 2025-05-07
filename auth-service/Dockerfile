FROM node:20
WORKDIR /app

# Copy package files and install all dependencies (including dev dependencies)
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Set environment variables
ENV PORT=3001

# Expose the port
EXPOSE 3001

# Run the application in development mode
CMD ["npm", "run", "start:dev"]