FROM node:8.4.0-alpine

ENV NODE_ENV production
ENV PORT 80
EXPOSE 80

COPY ./ /usr/src/app

WORKDIR /usr/src/app

RUN npm install
RUN npm run build

CMD [ "node", "./server" ]
