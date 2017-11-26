FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app

# Bundle app source
ADD . /usr/src/app
RUN npm run build

# Swagger
#RUN apk add --update openssl
#RUN wget https://github.com/swagger-api/swagger-ui/archive/v3.0.10.tar.gz
#RUN tar -xvzf v3.0.10.tar.gz
#RUN mv swagger-ui-3.0.10/dist/* swagger

EXPOSE 8080
CMD [ "npm", "start" ]
