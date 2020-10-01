FROM node:12.13.1-alpine

RUN npm install pm2 -g

WORKDIR /app
COPY . /app

RUN npm run build

EXPOSE 3000
CMD pm2-runtime src/server/index.js
