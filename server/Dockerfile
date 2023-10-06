FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# ENV DB_CONNECT=mongodb+srv://todoss:todoss123@todo.rderzgj.mongodb.net/


EXPOSE 3300


CMD [ "npm", "start" ]
