const jwt = require('jsonwebtoken');
const conexion = require('./../connections');

const verifyToken = (req, res, next) => {
    console.log('Ejecutando token');
    if(req.cookies.token) {
        try {
            const decodificada = jwt.verify(req.cookies.token, process.env.JWT_CLAVE);
            const sql = `SELECT * FROM usuarios WHERE userName = ${decodificada.userName}`;
            conexion.query(sql, (err, result) => {
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

const logout = (req, res)=>{
    res.clearCookie('token')   
    return res.redirect('/')
}


module.exports = verifyToken;