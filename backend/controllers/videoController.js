require('dotenv').config();
const axios = require('axios');
const redis = require('../config/redisClient');
const { REQUEST_HEADER, PANDA_BASE_API_URL } = require('../shared/panda_config');

const listVideos = async (req, res) => {
  const { page = 1 } = req.query;

  try {
    const cacheKey = `videos_page_${page}`;

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`🔵 Página ${page} retornada do cache`);
      return res.json(JSON.parse(cachedData));
    }

    console.log(`🟢 Buscando página ${page} da API Panda Video`);
    const response = await axios.get(`${PANDA_BASE_API_URL}/videos?page=${page}`, REQUEST_HEADER);

    const videosData = response.data;

    await redis.setex(cacheKey, 20, JSON.stringify(videosData));

    res.json(videosData);
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    res.status(500).json({ error: 'Erro ao buscar vídeos' });
  }
};

const getVideoById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${PANDA_BASE_API_URL}/videos/${id}`, REQUEST_HEADER);

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao buscar o vídeo:', error);
    return res.status(500).json({ error: 'Erro ao buscar o vídeo' });
  }
};

const updateVideoTitle = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'O campo title é obrigatório.' });
  }

  try {
    const response = await axios.put(
      `${PANDA_BASE_API_URL}/videos/${id}`,
      { title },
      REQUEST_HEADER
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao atualizar o título do vídeo:', error);
    return res.status(500).json({ error: 'Erro ao atualizar o título do vídeo' });
  }
};

module.exports = { listVideos, getVideoById, updateVideoTitle };
