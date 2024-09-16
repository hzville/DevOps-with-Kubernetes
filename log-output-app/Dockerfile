FROM node:alpine

WORKDIR /usr/src/app

COPY package-lock.json package.json ./

RUN npm ci

COPY logOutputApp.js server.js ./

CMD ["npm", "start"]