FROM node:16.15.0-alpine
WORKDIR /app
COPY . /app
RUN yarn install && yarn build
