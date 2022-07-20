const {pool} = require('./../connections');
const jwt = require('jsonwebtoken');

// Controladores para GET
const all = (req, res) => {
    // Buscar en la base de datos todos sus contactos
    const username = req.user.username;
    const sql = `SELECT * FROM contactos WHERE userName = '${username}'`;
    let datos = [];
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.render('contact/all', {user: req.user.name, datos: datos});
        } else {
            // Guardar los datos en un array
            result.rows.forEach(element => {datos.push(element);});
            console.log(datos);
            // Enviamos los datos al cliente
            res.render('contact/all', {user: req.user.name, datos: datos});
        }
    });
};


const viewCreate = (req, res) => {
    res.render('contact/create', {alert: false});
};


const viewDelete = (req, res) => {
    res.render('contact/delete',  {alert: false});
};


const viewUpdate = (req, res) => {
    res.render('contact/update');
};


// Controladores para POST
const createContact = (req, res) => {
    try {
        const username = req.user.username;
        const name = req.body.name;
        const email = req.body.email;
        const telefono = req.body.telefono;
        // Validamos que los campos obligatorios no esten vacios
        if (name && telefono) {
            // Agregar a los contactos
            const sql = `INSERT INTO contactos(nombre, email, telefono, username) VALUES ('${name}', '${email}', '${telefono}', '${username}')`;
            pool.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    res.render('contact/create', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: 'Ha ocurrido un error en la base de datos, verifique su conexión!',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'contact/create'
                    });
                } else {
                    res.render('contact/create', {
                        alert: true,
                        alertTitle: 'Conexión exitosa',
                        alertMessage: 'REGISTRO EXITOSO!',
                        alertIcon: 'success',
                        showConfirmButton: true,
                        timer: 800,
                        ruta: 'contact/all'
                    });
                }
            });
        } else {
            res.render('contact/create', {
                alert: true,
                alertTitle: 'Advertencia',
                alertMessage: 'Verifique que los campos no esten vacios',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'contact/create'
            });
        }
    } catch(error) {
        res.status(500).send(error);
    }
};


const deleteContact = (req, res) => {
    try {
        const id = req.params.id;
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.JWT_CLAVE)
        const userName = verified.userName;
        const sql = `DELETE FROM contactos WHERE id = '${id}' AND userName = '${userName}'`;
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.render('contact/delete', {
                    alert: true,
                    alertTitle: 'Ups algo ha fallado',
                    alertMessage: 'No se ha podido eliminar el contacto',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 800,
                    ruta: 'contact/all'
                });
            } else {
                res.render('contact/delete', {
                    alert: true,
                    alertTitle: 'Eliminación exitosa',
                    alertMessage: 'Se ha eliminado el contacto correctamente',
                    alertIcon: 'success',
                    showConfirmButton: true,
                    timer: 800,
                    ruta: 'contact/all'
                });
            }
        });
    } catch(error) {
        res.status(500).send(error);
    }
};


const updateContact = (req, res) => {
    res.send("Actualizando usuario: " + req.params.id);
};


// Exportamos las funciones
module.exports = {all, viewUpdate, deleteContact, updateContact, viewCreate, createContact, viewDelete};