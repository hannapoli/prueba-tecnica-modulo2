const { validationResult } = require('express-validator');

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array().map(err => err.msg);
        return res.status(400).json({
            ok: false,
            error: message
        });
    };
    next();
}

module.exports = { validateInput };