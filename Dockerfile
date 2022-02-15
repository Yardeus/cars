FROM node:17.5.0-alpine

COPY . .

WORKDIR .

EXPOSE 8002



RUN yarn install
COPY . ./

CMD yarn dev -p 8002
