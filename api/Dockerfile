FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies

ADD package-lock.json /tmp/package-lock.json
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app

# Bundle app source
ADD . /usr/src/app
RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]
