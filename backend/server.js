require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const folderRoutes = require('./routes/folderRoutes');

const app = express();
app.use(express.json());
app.use(cors());

sequelize.sync().then(() => {
  console.log('Banco de dados conectado');
});

app.use('/api', userRoutes);

app.use('/api', videoRoutes);

app.use('/api', folderRoutes);

app.get('/', (_req, res) => {
  res.send('API funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
