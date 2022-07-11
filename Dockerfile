FROM node:14-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333 9229

CMD ["npm", "run", "dev"]
