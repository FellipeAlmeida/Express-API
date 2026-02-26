FROM nginx:alpine

# Apaga arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia arquivos do front
COPY ./Frontend /usr/share/nginx/html