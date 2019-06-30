FROM node:10.16.0

ENV NODE_ENV=test

WORKDIR .

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn
RUN yarn

COPY . .

CMD [ "yarn", "start" ]
