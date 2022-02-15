FROM node:14.15.1-alpine

WORKDIR /backend



EXPOSE 1337

COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn build

CMD yarn start
