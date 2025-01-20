const PANDA_BASE_API_URL = 'https://api-v2.pandavideo.com.br';

const REQUEST_HEADER = {
  headers: {
    Authorization: `${process.env.API_KEY}`,
    Accept: 'application/json',
  },
};

module.exports = { PANDA_BASE_API_URL, REQUEST_HEADER };
