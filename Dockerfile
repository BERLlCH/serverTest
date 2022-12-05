FROM node:16-alpine
WORKDIR /opt/app
ADD . .
RUN yarn install
RUN yarn build
CMD ["yarn", "develop"]
