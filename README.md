# Sistema de Controle de Estoque

Sistema de Controle de Estoque envolvendo todas as tecnologias que um sistema web precisa.

## Ferramentas

- **Node.js** (*Backend*)
- **Express** (*Framework API*)
- **PostgreSQL** (*Banco de dados*)
- **JWT** (*Autenticação e Controle de acesso*)
- **Github Actions** (*Integração contínua*)
- **Docker** (*Conteinarização*)

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
        pages/
        scripts/
        styles/
        Dockerfile
        index.html
    .env-example
    .gitignore
    docker-compose.yml
    README.md
```

## Diagrama do Banco de Dados

![alt text](image-3.png)

## Como rodar o projeto

Certifique-se de ter o Docker instalado!

### Clonar projeto 

```
git clone <url do projeto>
```

### Criar .env na raiz do projeto

```
SECRET_KEY='sua_chave_secreta'
POSTGRES_USER=admin
POSTGRES_PASSWORD=1234
POSTGRES_DB=db
POSTGRES_HOST=db
PORT_DB=5432 
```

### Comando docker para rodar o projeto

```
docker compose up -d --build
```

Pronto! O projeto já está rodando na sua máquina.

## Comandos Docker

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
Front: localhost:5500
```

## Funcionalidades
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

## Arquitetura
O projeto segue padrão em camadas:

### Backend

- Rotas -> Recebem requisições
- Controllers -> Trata requisições 
- Services -> Regras de negócio
- Database -> Conexão com o banco

### Frontend

- Pages -> Interfaces
- Scripts -> Lógica e integração com API
- Styles -> Estilização


## Integração Contínua:

### Github Actions
#### Faz o deploy e notifica no telegram
![alt text](image.png)

## Dados do banco

O banco já começa com alguns dados populados. Sendo eles um usuário de cada perfil (admin, estoquista, consultor) e 3 produtos.

### Usuário 1 - Admin

Credenciais:

- Email: admin@email.com
- Senha: 123

### Usuário 2 - Consultor

Credenciais:

- Email: consultor@email.com
- Senha: 123

### Usuário 3 - Estoquista

Credenciais:

- Email: estoquista@email.com
- Senha: 123

## Todas as rotas 

### 🔐 AUTENTICAÇÃO

Algumas rotas podem exigir token JWT no header:

```
Authorization: SEU_TOKEN_AQUI
```

---

### 👤 ROTAS DE USUÁRIOS

## 🔑 Login

### POST `/users/login`

Realiza autenticação do usuário.

### Body:
```json
{
  "email": "admin@email.com",
  "senha": "123"
}
```

### Resposta de sucesso:
```json
{
  "mensagem": "Login realizado com sucesso!",
  "token": "jwt_token_aqui"
}
```

---

### ➕ Criar Usuário

### POST `/users/criar`

### Body:
```json
{
  "email": "user@email.com",
  "senha": "123456",
  "perfil": "admin"
}
```

### Resposta:
```json
{
  "mensagem": "Usuário criado com sucesso!"
}
```

---

## 📋 Listar Usuários

### GET `/users/listar`

### Resposta:
```json
{
  "mensagem": "Usuários retornados com sucesso:",
  "dados": [
    {
      "id": 1,
      "email": "admin@email.com",
      "perfil": "admin"
    }
  ]
}
```

---

## ✏️ Editar Usuário

### PUT `/users/editar/:id/perfil`

### Body:
```json
{
  "perfil": "estoquista"
}
```

---

## 👤 Usuário Atual

### GET `/users/me`

Necessário token no header.

### Resposta:
```json
{
  "mensagem": "Usuário atual retonado com sucesso!",
  "dados": {
    "id": 1,
    "email": "admin@email.com",
    "perfil": "admin"
  }
}
```

---

# 📦 ROTAS DE PRODUTOS

## ➕ Criar Produto

### POST `/products/criar`

### Body:
```json
{
  "nome": "Arroz",
  "quantidade": 10,
  "minimo": 3
}
```

### Resposta:
```json
{
  "mensagem": "Produto criado com sucesso!"
}
```

---

## 📋 Listar Produtos

### GET `/products/listar`

### Resposta:
```json
{
  "mensagem": "Produtos retornados com sucesso!",
  "dados": [
    {
      "id": 1,
      "nome": "Teclado",
      "quantidade": 10,
      "minimo": 3
    }
  ]
}
```

---

## 🔎 Buscar Produto por ID

### GET `/products/buscar/:id`

### Resposta:
```json
{
  "message": "Produto retornado com sucesso!",
  "dados": {
    "id": 1,
    "nome": "Teclado",
    "quantidade": 10,
    "minimo": 3
  }
}
```

---

## ✏️ Editar Produto

### PUT `/products/editar/:id`

### Body:
```json
{
  "nome": "Feijão",
  "minimo": 5
}
```

---

## ❌ Deletar Produto

### DELETE `/products/deletar/:id`

### Resposta:
```json
{
  "mensagem": "Produto deletado com sucesso!"
}
```

---

## ⚠️ Relatório de Baixo Estoque

Retorna produtos onde `quantidade <= minimo`

### GET `/products/relatorios/baixo-estoque`

### Resposta:
```json
{
  "mensagem": "Produtos retornados com sucesso!",
  "dados": [
    {
      "id": 2,
      "nome": "Arroz",
      "quantidade": 2,
      "minimo": 5
    }
  ]
}
```

---

# 🔄 ROTAS DE MOVIMENTAÇÕES

## 📥 Criar Movimentação de Entrada

### POST `/movements/entrada`

### Body:
```json
{
  "produto_id": 1,
  "tipo": "entrada",
  "quantidade": 5,
  "data_hora": "2026-02-28 10:00:00",
  "usuario_id": 1
}
```

### Resposta:
```json
{
  "mensagem": "Movimentação de entrada criada com sucesso!"
}
```

---

## 📤 Criar Movimentação de Saída

### POST `/movements/saida`

### Body:
```json
{
  "produto_id": 1,
  "tipo": "saida",
  "quantidade": 3,
  "data_hora": "2026-02-28 11:00:00",
  "usuario_id": 1
}
```

### Resposta:
```json
{
  "mensagem": "Movimentação de saida criada com sucesso!"
}
```

---

## 📋 Listar Movimentações

### GET `/movements/listar`

### Resposta:
```json
{
  "mensagem": "Movimentações retornadas com sucesso!",
  "dados": [
    {
      "id": 1,
      "produto_id": 1,
      "tipo": "entrada",
      "quantidade": 5,
      "data_hora": "2026-02-28 10:00:00",
      "usuario_id": 1
    }
  ]
}
```

---

# 🗂 Estrutura de Perfis e Permissões

| Ação | Admin | Estoquista | Consultor |
|------|-------|------------|-----------|
| Criar usuário | ✅ | ❌ | ❌ |
| Listar usuários | ✅ | ❌ | ❌ |
| Editar usuário | ✅ | ❌ | ❌ |
| Criar produto | ✅ | ✅ | ❌ |
| Editar produto | ✅ | ✅ | ❌ |
| Deletar produto | ✅ | ❌ | ❌ |
| Listar produtos | ✅ | ✅ | ✅ |
| Relatório estoque baixo | ✅ | ✅ | ✅ |
| Criar movimentação | ✅ | ✅ | ❌ |
| Listar movimentações | ✅ | ✅ | ✅ |

---
