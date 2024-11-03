# Stage 1: Build the application
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript files
RUN npm run build

# Stage 2: Run the application
FROM node:18-slim AS production

# Set working directory
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=build /app ./
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the port the app runs on
EXPOSE 4000

ARG PORT
ENV PORT=$PORT

# Start the application
CMD ["node", "index.js"]
