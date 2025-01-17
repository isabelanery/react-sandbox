
# Panda Video Test

Este repositório contém a implementação de um projeto full-stack que utiliza as tecnologias Vue.js, Vuetify, Node.js, Express, PostgreSQL, Redis e Docker. O objetivo deste teste técnico é criar uma aplicação que interaja com a API da Panda Video.

## Como Rodar o Projeto

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd panda-video-test
```

### 2. Configurar e subir os containers
O projeto usa Docker Compose para configurar todos os serviços necessários.

- Para rodar os containers com a configuração de desenvolvimento, execute:
  ```bash
  docker-compose up --build
  ```

### 3. Acessar a aplicação

- **Frontend**: A aplicação Vue.js estará disponível em `http://localhost:8080`.
- **Backend**: O servidor Express estará disponível em `http://localhost:3000`.

### 4. Parar os containers

Para parar todos os containers, execute:
```bash
docker-compose down
```
