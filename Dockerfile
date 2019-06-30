FROM node:12.5.0

# RUN mkdir -p /app

WORKDIR /

# ADD . /app

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]
