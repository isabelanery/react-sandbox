const express = require('express');
const { listVideos, getVideoById, updateVideoTitle } = require('../controllers/videoController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/videos', authenticateToken, listVideos);

router.get('/video/:id', authenticateToken, getVideoById);

router.put('/video/:id', authenticateToken, updateVideoTitle);

module.exports = router;
