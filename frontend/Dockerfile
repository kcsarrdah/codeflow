FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start Vite dev server with host set to allow external connections
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]