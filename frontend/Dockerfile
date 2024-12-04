# Use Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install `serve` globally for serving the production build
RUN npm install -g serve

# Copy all other files
COPY . .

# Build the React app for production
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Serve the app using `serve`
CMD ["serve", "-s", "build"]
