FROM node:8.4.0-alpine

ENV NODE_ENV production
ENV PORT 8080
EXPOSE 8080

COPY ./ /usr/src/app

WORKDIR /usr/src/app

RUN npm install
RUN npm run build

CMD [ "node", "./server" ]
