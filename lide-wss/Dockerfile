FROM node:lts-alpine
WORKDIR /app
COPY server_socket.js ./
COPY logger.js ./
COPY HTTPS_CREDENTIALS ./
RUN apk add docker
RUN npm install ws
