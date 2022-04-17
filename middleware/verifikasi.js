const jwt = require("jsonwebtoken");
const config = require("../config/secret");

function verifyToken() {
    return function (req, res, next) {
        var rule = req.body.rule;
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(" ")[1];
            // verifikasi
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.status(401).send({auth: false, message: "Token tidak valid"});
                } else {
                    if (rule == 1) {
                        req.auth = decoded;
                        next();
                    } else {
                        return res.status(401).send({auth: false, message: "Gagal mengakses"});
                    }
                }
            });
        } else {
            return res.status(401).send({auth: false, message: "Token tidak tersedia"});
        }
    }
}

module.exports = verifyToken;