FROM node

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

# popula o banco e inicia o servidor
CMD ["sh", "./start.sh"]