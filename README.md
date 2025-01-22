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

4. **Rodar migrations:**
   - Em um terminal separado, rode as migrations para configurar o banco de dados:
   ```bash
   docker-compose exec backend npx sequelize-cli db:migrate
   ```

5. **Rodar seeds:**
   - Depois, rode as seeds para popular o banco de dados com dados iniciais:
   ```bash
   docker-compose exec backend npx sequelize-cli db:seed:all
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

## 📂 Estrutura do Projeto
   A organização do projeto segue a seguinte estrutura:

   ```
   📦 projeto
   ├── backend
   │   ├── config           # Configurações da aplicação
   │   ├── controllers      # Controladores das rotas
   │   ├── middlewares      # Middlewares para autenticação e validações
   │   ├── migrations       # Migrations do banco de dados
   │   ├── routes           # Definição das rotas da API
   │   ├── seeders          # Seeds para popular o banco
   │   ├── shared           # Utilitários e funções reutilizáveis
   │   ├── .env.example     # Exemplo de variáveis de ambiente (importante)
   │   ├── Dockerfile       # Configuração do Docker para o backend
   ├── frontend
   │   ├── public           # Arquivos públicos do frontend
   │   ├── src
   │   │   ├── assets       # Recursos estáticos (imagens, estilos, etc.)
   │   │   ├── components   # Componentes reutilizáveis
   │   │   ├── pages        # Páginas da aplicação
   │   │   ├── plugins      # Configuração do Vuetify
   │   │   ├── router       # Configuração das rotas do Vue Router
   │   │   ├── services     # Chamadas à API
   │   ├── tests            # Testes do frontend
   │   ├── Dockerfile       # Configuração do Docker para o frontend
   ├── docker-compose.yml   # Configuração para subir todos os serviços com Docker
   ```


🚀 Bom uso!
