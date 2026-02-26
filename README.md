# Sistema de Controle de Estoque

Sistema de Controle de Estoque de um supermercado envolvendo todas as tecnologias que um sistema web precisa.

## Ferramentas

- **Node.js** (*Backend*)
- **Express** (*Framework API*)
- **PostgreSQL** (*Banco de dados*)
- **JWT** (*Autenticação e Controle de acesso*)
- **Github Actions** (*Integração contínua*)

## Organização do Projeto

```
Express-API/
    .github/
        workflows/
    Backend/
        app/
            config/
            controllers/
            database/
            middlewares/
            routes/
            services/
            migrations.js
            server.js
        Dockerfile
        package-lock.json
        package.json
        start.sh
    Frontend/
        css/
        Dockerfile
        index.html
        index.js
    .env-example
    .gitignore
    docker-compose.yml
    README.md
```

## Diagrama do Banco de Dados

![alt text](image-3.png)

## Como rodar o projeto

### Clonar projeto 

```
git clone <url do projeto>
```

### Criar .env na raiz do projeto

```
SECRET_KEY=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
POSTGRES_HOST=...
PORT=...

ps: pode definir as variaveis da forma que quiser!
```

### Comando docker

```
docker compose up -d --build
```

### Comando docker para derrubar

```
docker compose down
```

### Comando docker para apagar tudo (volumes, containers, networks etc)

```
docker rm -f $(docker ps -aq)
docker volume rm $(docker volume ls -q)
docker system prune -a --volumes
```

### Para recriar

```
docker compose up -d --build
```

### Serviços
```
Api: localhost:5000
Adminer: localhost:8000
```

# Funcionalidades
- Autenticação e autorização com tokens JWT
- Sistema de perfis de usuários (admin, estoquista, consultor) 
- Controle de tentativas de login
- Bloqueio automático por tentativas inválidas
- Cadastro de usuários
- Registro de movimentações (entrada e saida)
- Registro de produtos
- Edição de Produtos e Usuários
- Listagem de Produtos, Usuários e movimentações
- Busca de Produtos por id
- Deleção de produtos por id
- Geração de relatório

# Arquitetura
O projeto segue padrão em camadas:

## Backend

- Rotas -> Recebem requisições
- Controllers -> Trata requisições 
- Services -> Regras de negócio
- Database -> Conexão com o banco

## Frontend

- Pages -> Interfaces
- Scripts -> Lógica e integração com API
- Styles -> Estilização


# Integração Contínua:

## Github Actions
### Faz o deploy e notifica no telegram
![alt text](image.png)