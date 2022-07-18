const {pool} = require('./../connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const inicio = (req, res) => {
    res.render('inicio/index');
}


const viewLogin = (req, res) => {
    res.render('inicio/login');
};


const viewRegister = (req, res) => {
    res.render('inicio/register');
};


const login = (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    // Validamos que no esten vacios los campos
    if (userName && password) { 
        const sql = `SELECT * FROM usuarios WHERE userName = '${userName}'`;
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                console.log('Error al consultar el usuario');
                res.render('inicio/login');
            } else {
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    // Validamos que la contraseña sea correcta
                    if (bcrypt.compareSync(password, user.password)) {
                        const name = user.name;
                        const userName = user.userName;

                        // Generamos el token
                        const token = jwt.sign({name: name, userName: userName}, process.env.JWT_CLAVE, 
                            {expiresIn: process.env.JWT_VENCIMIENTO}
                        );
                        console.log(token);

                        // Configuramos las cookies
                        const coookiesOptions = { 
                            expires: new Date(Date.now() + process.env.JWT_COOKIE_VENCIMIENTO * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        };

                        // Creamos las cookies
                        res.cookie('token', token, coookiesOptions);
                        res.render('contact/all');
                    } else {
                        console.log('Contraseña incorrecta');
                        res.render('inicio/login');
                    }
                } else {
                    console.log('No existe el usuario');
                    res.render('inicio/login');
                }
            }
        });
    }
};


const register = (req, res) => {
    const name = req.body.name;
    const password = bcrypt.hashSync(req.body.password, 10);
    const userName = req.body.userName;
    // Validamos que no esten vacios los campos
    if (name && password && userName) {
        const sql = `INSERT INTO usuarios(name, password, userName) VALUES ('${name}', '${password}', '${userName}')`;
        pool.query(sql, (err) => {
            if (err) {
                console.log(err);
                res.render('inicio/login', {cod: 'no'});
            } else {
                res.render('inicio/login', {cod: 'ok'});
            }
        });
    } else {
        res.render('inicio/login', {cod: 'verificar'});
    }
};


module.exports = { viewLogin, viewRegister, login, register, inicio};