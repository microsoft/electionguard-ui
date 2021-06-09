FROM node:14.10
WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]

COPY . /app
