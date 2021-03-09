# Base image
FROM node:alpine

# Create & set working directory
WORKDIR /app

# copy source files
COPY . /app

# Install dependencies
RUN npm install

# Start app
EXPOSE 3000
CMD ["npm", "run", "dev"]
