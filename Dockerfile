FROM node:12.5.0

RUN mkdir -p /app

WORKDIR /app

ADD . /app

RUN npm

EXPOSE 4000

CMD ["npm", "start"]
