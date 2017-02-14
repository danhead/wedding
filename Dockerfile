FROM node:7.2.1-alpine

# Need cURL to report to Rollbar
RUN apk --no-cache add curl git

# Copy app
COPY ./ /usr/src/app
WORKDIR /usr/src/app

# Install dev + prod dependencies and build release
RUN npm install --no-optional --silent

# Environment variables
ENV DATABASE_PATH db/wedding.db
ENV NODE_ENV production
ENV PORT 80
EXPOSE 80

# Run production build
RUN npm run build --release --silent

WORKDIR /usr/src/app/build

# Install Node.js dependencies
RUN npm install --production --silent

WORKDIR /usr/src/app

RUN curl https://api.rollbar.com/api/1/deploy/ \
	-F access_token=8bf333d044df48c19a6929e4b1613a8e \
	-F environment=production \
	-F revision=$(git log -n 1 --pretty=format:"%H") \
	-F local_username="$(git log -n 1 --pretty=format:"%an")"

WORKDIR /usr/src/app/build

CMD [ "node", "server.js" ]
