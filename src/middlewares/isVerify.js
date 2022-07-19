const jwt = require('jsonwebtoken');
const {pool} = require('./../connections');

const verifyToken = (req, res, next) => {
    console.log('Ejecutando token');
    if(req.cookies.token) {
        try {
            const token = req.cookies.token;
            const verified = jwt.verify(token, process.env.JWT_CLAVE)
            const sql = `SELECT * FROM usuarios WHERE username = '${verified.userName}'`;
            pool.query(sql, (err, result) => {
                if(!result){
                    next();
                } else {
                    req.user = result.rows[0];
                    next();
                }
            });
        } catch(error) {
            console.log(error);
            next();
        }
    } else {
        res.redirect('/login');
    }
};




module.exports = verifyToken;