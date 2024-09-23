FROM node:alpine

WORKDIR /usr/src/app

EXPOSE 3004

COPY package-lock.json package.json ./

RUN npm ci

COPY /src ./

CMD ["npm", "start"]