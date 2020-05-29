FROM node:latest
WORKDIR /usr/src/back

EXPOSE 8080
CMD [ "npm", "start" ]
