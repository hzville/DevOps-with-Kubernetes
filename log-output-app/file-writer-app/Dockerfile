FROM node:alpine

WORKDIR /usr/src/app

COPY  package.json ./

RUN npm i

COPY fileWriter.js ./

CMD ["npm", "start"]