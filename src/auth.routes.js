const express = require('express');
const router = express.Router();
const {verifyToken} = require('./verifyToken.middleware');
const {getUserData, login} = require('./auth.controller');

router.post('/login', login);

router.get('/me', verifyToken, getUserData);

module.exports = router;