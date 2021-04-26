FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install -g @angular/cli
RUN npm i

CMD ["npm", "start"]

