FROM node:alpine

WORKDIR /achievement-tracker

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "build" ]

EXPOSE 5555

CMD [ "npm", "run", "preview" ]