const config = require('../config.json');
const jwt = require('jsonwebtoken');

// It's might be working like a decorator
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    // console.log("authHeader:", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    // console.log("token:", token);
    if (token == null) 
        return res.sendStatus(401);

    jwt.verify(token, config.ACCESS_TOKEN, (err, response) => {
        if (err)
        return res.sendStatus(403)
        // console.log("response (after JWT verification):", response)
        res.locals = response
        next();
    });
}

module.exports = { authenticateToken: authenticateToken };
