#!/bin/bash
# This script will build and push docker image to hub

echo "Current directory: $(pwd)"

# Remove the default builder and create a new one for multiplatform build
docker buildx rm default
docker buildx create --name multiplatform --driver docker-container --use
docker buildx ls
docker buildx use multiplatform # Switch to the new builder

# Build the frontend
cd frontend && npm run build
cd ../

# Build docker image (not using flag -f as I've used the default Dockerfile)
# For local deployment
docker build -t chocolatey-backend:v0.0.1 .
# docker run -p 5050:5050 --name chocolatey-backend --env-file .env chocolatey-backend:v0.0.1

# For production deployment
docker buildx build --platform linux/amd64,linux/arm64 -t niharikadutta/chocolatey-backend:v0.0.1 --push .

echo "\n Deployment complete!"

# docker push niharikadutta/chocolatey-backend:v0.0.1
# docker pull niharikadutta/chocolatey-backend:v0.0.1

# 1. Do necessary changes in the environment variables
# 2. Run the script
# 3. Upload the deployment setup in the server(VM) using scp
# 4. Run the docker compose file in the server
