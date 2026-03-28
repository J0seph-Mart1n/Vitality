# Use an official Node runtime
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the Metro Bundler port
EXPOSE 8081

# Start the Expo development server
CMD ["npm", "start"]
