const jwt = require('jsonwebtoken');
const {pool} = require('./../connections');

// Este middleware verifica si el usuario esta autenticado, si no lo esta, lo redirige a la pagina de login
// Se ejecuta antes de cualquier metodo de la ruta contact
const verifyToken = (req, res, next) => {
    console.log('Ejecutando token');
    // Verificamos si existe un token en la cookie
    if(req.cookies.token) {
        try {
            // Si existe, verificamos que el token sea valido
            const token = req.cookies.token;
            const verified = jwt.verify(token, process.env.JWT_CLAVE)
            // Se extrae el userName del token y lo buscamos en la base de datos
            const sql = `SELECT * FROM usuarios WHERE username = '${verified.userName}'`;
            pool.query(sql, (err, result) => {
                if(!result){
                    next();
                } else {
                    // Si el usuario existe, lo guardamos en la request
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