# ============================================
# Stage 1: Build React Application
# ============================================
FROM node:16.20.1 AS build
WORKDIR /app

# Build arguments - passed from docker build --build-arg
# These MUST be provided during build, not at runtime
ARG REACT_APP_API_URL=https://api.az-ko.az/api/v1/
ARG REACT_APP_BASE_URL=https://api.az-ko.az

# Convert ARG to ENV so React's webpack can access them during build
# React embeds these values into the JavaScript bundle at BUILD TIME
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV NODE_ENV=production

# Install dependencies
COPY package.json package-lock.json* /app/
RUN npm install --legacy-peer-deps --force

# Copy source code and build
# The build process will embed REACT_APP_* env vars into the bundle
COPY ./ /app/
RUN npm run build

# Verify build output exists
RUN ls -la /app/build && echo "✅ Build completed successfully"

# ============================================
# Stage 2: Serve with Nginx
# ============================================
FROM nginx:1.23.3-alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Verify files were copied
RUN ls -la /usr/share/nginx/html && echo "✅ Files copied to nginx"

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

