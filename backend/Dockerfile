# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["node", "server.js"]
