FROM node:alpine

WORKDIR /usr/src/app

COPY package-lock.json package.json ./

RUN npm ci

COPY server.js fileReader.js ./

CMD ["npm", "start"]