FROM node:12.5.0

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN yarn

EXPOSE 4000

CMD ["yarn", "start"]
