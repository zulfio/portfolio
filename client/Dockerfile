FROM node:20-alpine

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json ./

# Install dependecies
RUN npm install
RUN npm update

# Get all the code needed to run the app
COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]