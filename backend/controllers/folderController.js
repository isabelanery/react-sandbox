require('dotenv').config();
const axios = require('axios');
const { PANDA_BASE_API_URL, REQUEST_HEADER } = require('../shared/panda_config');

const listFolders = async (_req, res) => {
  try {
    console.log(`🟢 Buscando pastas em API Panda Video`);
    const response = await axios.get(`${PANDA_BASE_API_URL}/folders`, REQUEST_HEADER);

    const foldersData = response.data;

    res.json(foldersData);
  } catch (error) {
    console.error('Erro ao buscar pastas:', error);
    res.status(500).json({ error: 'Erro ao buscar pastas' });
  }
};

module.exports = { listFolders };
