FROM node:8.4.0-alpine

COPY ./ /usr/src
WORKDIR /usr/src

RUN npm install --silent

ENV NODE_ENV production
ENV PORT 80
EXPOSE 80

CMD [ "node", "server.js" ]
