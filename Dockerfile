FROM node:16-alpine
WORKDIR /opt/app
ADD . .
RUN yarn install
CMD ["yarn", "develop"]
