FROM node

WORKDIR /app

COPY package.json .
RUN npm install

COPY app/server.js .

CMD ["node", "server.js"]