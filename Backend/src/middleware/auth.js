const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const secret_key = process.env.SECRET_KEY || "passkey";

const auth = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Auth Middleware Error:', err);
        res.status(401).json({ msg: 'Invalid token' });
    }
};

const isAdmin = (req, res, next) => {
    auth(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ msg: 'Access denied. Admins only.' });
        }
    });
};

module.exports = {
    auth,
    isAdmin
};
