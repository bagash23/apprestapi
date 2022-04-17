const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verifyToken = require('./verifikasi');

router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

// halaman yang autorization
router.get('/api/v1/private', verifyToken(), auth.halamanRahasia);

module.exports = router;