FROM node:alpine

WORKDIR /achievementtracker

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5555

CMD [ "npm", "run", "preview" ]