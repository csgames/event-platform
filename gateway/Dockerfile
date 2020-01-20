FROM node:8-alpine
EXPOSE 8000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies

ADD app/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app

# Bundle app source
ADD app/ /usr/src/app
RUN npm run build

CMD [ "npm", "start" ]
