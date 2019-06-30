FROM node:12.5.0

ENV NODE_ENV=test

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn
RUN npm install

COPY . .

CMD [ "yarn", "start" ]
