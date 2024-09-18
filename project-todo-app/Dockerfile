FROM node:alpine

WORKDIR /usr/src/app

EXPOSE 3001

COPY package-lock.json package.json ./

RUN npm ci

COPY server.js getImage.js front-page.html ./

CMD ["npm", "start"]