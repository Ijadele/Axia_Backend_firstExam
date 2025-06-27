const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const {token} = res.cookies;
    if (!token) {
        res.json({message: "Please Login"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.json({message: "Session expired"})
        }
        req.user = {id: payload.id, admin: payload.isAdmin}
        next();
    });
};

module.exports = authentication;