FROM node:18-alpine AS build

WORKDIR /achievement-tracker

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS serve

RUN npm install -g serve

COPY --from=build /achievement-tracker/dist /achievement-tracker/dist

COPY serve.json /achievement-tracker/dist/serve.json

EXPOSE 5555

CMD ["serve", "-s", "/achievement-tracker/dist", "-l", "5555"]
