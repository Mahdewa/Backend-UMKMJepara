const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/adminController');

// Untuk setup awal, boleh dihapus nanti
router.post('/register', register);

router.post('/login', login);

module.exports = router;