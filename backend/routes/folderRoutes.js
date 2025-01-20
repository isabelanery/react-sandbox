const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { listFolders } = require('../controllers/folderController');

const router = express.Router();

router.get('/folders', authenticateToken, listFolders);

module.exports = router;
