FROM node:7.2.1-alpine

ENV DATABASE_PATH db/wedding.db
ENV PORT 80
EXPOSE 80

# Copy app
COPY ./ /usr/src/app
WORKDIR /usr/src/app

# Install dev dependencies and build release
RUN npm install --no-optional --silent
RUN npm run build --release --silent

WORKDIR /usr/src/app/build

# Install Node.js dependencies
RUN npm install --production --silent

CMD [ "node", "server.js" ]
