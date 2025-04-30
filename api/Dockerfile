# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:latest

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json bun.lockb ./

# Install dependecies
RUN bun install

# Get all the code needed to run the app
COPY . .

# Expose the port the app runs in
EXPOSE 5000

# Serve the app
CMD ["bun", "run", "dev"]