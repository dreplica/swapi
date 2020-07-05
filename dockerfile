FROM node:12.18.2-alpine3.9

LABEL maintainer='thradishion@gmail.com'

WORKDIR /src


COPY ./package.json .

RUN npm install --quiet

COPY . .
