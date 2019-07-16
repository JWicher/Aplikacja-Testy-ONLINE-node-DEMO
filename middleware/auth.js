const jwt = require("jsonwebtoken");
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Odmowa dostępu");

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.użytkownik = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('Nieprawidłowy token');
    }
};