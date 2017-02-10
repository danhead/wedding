FROM node:7.2.1-alpine

# Copy application files
COPY ./build /usr/src/app
WORKDIR /usr/src/app

ENV DATABASE_PATH db/wedding.db
ENV PORT 80

EXPOSE 80

# Install Node.js dependencies
RUN npm install --production --silent

CMD [ "node", "server.js" ]
