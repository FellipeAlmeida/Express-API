FROM node

WORKDIR /Backend

COPY Backend/package*.json .
RUN npm install

COPY Backend .

EXPOSE 5000

# popula o banco e inicia o servidor
CMD ["sh", "start.sh"]