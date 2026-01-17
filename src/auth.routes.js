const express = require('express');
const router = express.Router();
const { verifyToken } = require('./verifyToken.middleware');
const { validateInput } = require('./validateInput.middleware');
const { getUserData, login } = require('./auth.controller');
const { check } = require('express-validator');

router.post('/login',
    check('username')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido")
        .matches(/^[a-z ]+$/i).withMessage("Escriba un nombre válido, compuesto por letras."),
    validateInput,
    login);

router.get('/me', verifyToken, getUserData);

module.exports = router;