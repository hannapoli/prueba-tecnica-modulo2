const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET;

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({
                ok: false,
                message: 'No hay token en la petición.'
            });
        const payload = jwt.verify(token, secretKey);
        // console.log(payload)
        req.payload = payload;
        await new Promise(resolve => setTimeout(resolve, 200));
        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            ok: false,
            message: "Token no válido."
        });
    }
}

module.exports = { verifyToken };