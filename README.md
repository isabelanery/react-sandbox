## 🚀 Setup

1. **Clone o repositório:**
   ```sh
   git clone git@github.com:isabelanery/panda_videos.git
   cd panda_video
   ```
2. **Configuração do ambiente:**
   - Renomeie `/backend/.env.example` para `.env` e adicione sua `API_KEY` da Panda Video.

3. **Subindo a aplicação:**
   ```sh
   docker-compose up --build
   ```

## 🔑 Acesso Padrão

- O frontend estará disponível em `http://localhost:8080`.
- O backend estará disponível em `http://localhost:3000`.

Usuário pré-cadastrado:
```sh
email: kungfu@panda.com
password: password
```

## 💪 Testando o Frontend

Para rodar os testes do frontend:
```sh
cd frontend
npm install
npm run test
```

## 🛋️ Tecnologias Utilizadas

- **Frontend**:
  - Vue.js
  - Vuetify

- **Backend**:
  - Node.js + Express
  - PostgreSQL (banco de dados)
  - Redis (cache de vídeos)
  - Sequelize (ORM para banco de dados)
  - JWT (autenticação)
  - Axios (requisições HTTP)

- **Infraestrutura**:
  - Docker + Docker Compose

## 📌 Observações
- O projeto **só funciona via Docker** devido à dependência do Redis.

## 📌 Endpoints

- **Autenticação:** `POST /api/login`
- **Listar vídeos:** `GET /api/videos`
- **Detalhes do vídeo:** `GET /api/videos/:id`
- **Editar vídeo:** `PUT /api/videos/:id`
- **Listar pastas:** `GET /api/folders`


🚀 Bom uso!
