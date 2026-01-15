const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET;

const login = (req, res) => {
    const { username } = req.body;
    const token = jwt.sign({ username }, secretKey);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({
        ok: true,
        message: 'Login de usuario',
        user: username,
        token: token
    });
};

const getUserData = (req, res) => {
    const { username } = req.payload;
    try {
        res.status(200).json({
            ok: true,
            message: 'Token verificado',
            user: username
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            message: "Error del servidor. Consulte su administrador."
        });
    }
};

module.exports = {
    login,
    getUserData
}