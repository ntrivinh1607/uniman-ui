FROM public.ecr.aws/docker/library/node:current-alpine3.20 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --verbose
COPY . .
RUN yarn build

# Step 2: Serve the React app using Nginx
FROM public.ecr.aws/nginx/nginx:stable-perl

# Copy the build output to replace the default nginx contents.
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it from the outside.
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]