const {pool} = require('./../connections');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const inicio = (req, res) => {
    res.render('inicio/index');
}


const viewLogin = (req, res) => {
    res.render('inicio/login', {alert: false});
};



const viewRegister = (req, res) => {
    res.render('inicio/register', {alert: false});
};


const login = (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;
        // Validamos que no esten vacios los campos
        if (userName && password) { 
            const sql = `SELECT * FROM usuarios WHERE userName = '${userName}'`;
            pool.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    console.log('Error al consultar el usuario');
                    res.render('inicio/login', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: 'Ha ocurrido un error en la base de datos',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    });
                } else {
                    if (result.rows.length > 0) {
                        const user = result.rows[0];
                        // Validamos que la contraseña sea correcta
                        if (bcrypt.compareSync(password, user.password)) {
                            const name = user.name;
                            const userName = user.username;
                            
                            // Generamos el token
                            const token = jwt.sign({userName: userName, name: name}, process.env.JWT_CLAVE, 
                                {expiresIn: process.env.JWT_VENCIMIENTO}
                            );
    
                            // Configuramos las cookies
                            const coookiesOptions = { 
                                expires: new Date(Date.now() + process.env.JWT_COOKIE_VENCIMIENTO * 24 * 60 * 60 * 1000),
                                httpOnly: true
                            };
    
                            // Creamos las cookies
                            res.cookie('token', token, coookiesOptions);
                            res.render('inicio/login', {
                                alert: true,
                                alertTitle: 'Conexión exitosa',
                                alertMessage: 'LOGIN CORRECTO!',
                                alertIcon: 'success',
                                showConfirmButton: true,
                                timer: 800,
                                ruta: 'contact/all'
                            });
                        } else {
                            console.log('Contraseña incorrecta');
                            res.render('inicio/login', {
                                alert: true,
                                alertTitle: 'Error',
                                alertMessage: 'El usuario y la contraseña ingresada no coinciden',
                                alertIcon: 'error',
                                showConfirmButton: true,
                                timer: false,
                                ruta: 'login'
                            });
                        }
                    } else {
                        console.log('No existe el usuario');
                        res.render('inicio/login', {
                            alert: true,
                            alertTitle: 'Error',
                            alertMessage: 'El usuario no se encuentra registrado en la base de datos',
                            alertIcon: 'error',
                            showConfirmButton: true,
                            timer: false,
                            ruta: 'login'
                        });
                    }
                }
            });
        } else {
            res.render('inicio/login', {
                alert: true,
                alertTitle: 'Advertencia',
                alertMessage: 'Verifique que los campos no esten vacios',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};


const register = (req, res) => {
    try {
        const name = req.body.name;
        const passTemp = req.body.password;
        const userName = req.body.userName;
        // Validamos que no esten vacios los campos
        if (name && passTemp && userName) {
            const password = bcrypt.hashSync(passTemp, 10);
            const sql = `INSERT INTO usuarios(name, password, userName) VALUES ('${name}', '${password}', '${userName}')`;
            pool.query(sql, (err) => {
                if (err) {
                    console.log(err);
                    res.render('inicio/register', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: 'El usuario ya existe en la base de datos o verifique su conexión!',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'register'
                    });
                } else {
                    res.render('inicio/register', {
                        alert: true,
                        alertTitle: 'Conexión exitosa',
                        alertMessage: 'REGISTRO CORRECTO!',
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: 1000,
                        ruta: 'login'
                    });
                }
            });
        } else {
            res.render('inicio/register', {
                alert: true,
                alertTitle: 'Advertencia',
                alertMessage: 'Verifique que los campos no esten vacios',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'register'
            });
        }
    } catch(error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};


const logout = (req, res)=>{
    res.clearCookie('token')   
    res.redirect('/')
}

module.exports = {viewLogin, viewRegister, login, register, inicio, logout};