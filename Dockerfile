FROM node:7.2.1-alpine

# Environment variables
ENV DATABASE_PATH db/wedding.db
ENV PORT 80
EXPOSE 80

# Copy app
COPY ./ /usr/src/app
WORKDIR /usr/src/app

# Install dev + prod dependencies and build release
RUN npm install --no-optional --silent

# Run production build
ENV NODE_ENV production
RUN npm run build --release --silent

WORKDIR /usr/src/app/build

# Install Node.js dependencies
RUN npm install --production --silent

CMD [ "node", "server.js" ]
