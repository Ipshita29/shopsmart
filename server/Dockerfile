FROM node:20-slim

# Install openssl for Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client for the OS
RUN npx prisma generate

# Copy the rest of the application
COPY . .

EXPOSE 5001

CMD ["npm", "start"]