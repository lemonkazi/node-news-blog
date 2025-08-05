# Use official Node.js image with Alpine
FROM node:22-alpine

# credits goes here
LABEL author="Kazi Mamun"
LABEL maintainer="Kazi Mamun <lemonpstu09@gmail.com>"
# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the application
#RUN npm run build

# Expose port 9000 (API port)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
