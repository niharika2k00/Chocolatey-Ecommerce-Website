ARG NODE_VERSION=20.14.0

FROM node:${NODE_VERSION}-alpine

# Set working directory inside the container
WORKDIR /app

# Copy and install backend package dependencies first for better docker layer caching
COPY backend/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy the entire backend source code
COPY backend/ .

# Create uploads directory for static files
# RUN mkdir -p uploads
COPY frontend/build/ ./public

# Expose the port that the application listens on
EXPOSE 5050

# Run the application      OR CMD ["node", "server.js"]
CMD ["npm", "start"]
