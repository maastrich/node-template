FROM node:latest
WORKDIR /usr/src/back

EXPOSE 8000
CMD [ "yarn", "start" ]
