// Importamos la conexión
const {pool} = require('./../connections');
const jwt = require('jsonwebtoken');

// Controladores para GET
const all = (req, res) => {
    // Buscar en la base de datos todos sus contactos
    const username = req.user.username;
    const sql = `SELECT * FROM contactos WHERE userName = '${username}'`;
    let datos = [];
    // Realizamos la consulta
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.render('contact/all', {user: req.user.name, datos: datos});
        } else {
            // Guardar los datos en un array
            result.rows.forEach(element => {datos.push(element);});
            // Enviamos los datos al cliente
            res.render('contact/all', {user: req.user.name, datos: datos});
        }
    });
};


// Renderizar la vista para la creación de un nuevo contacto
const viewCreate = (req, res) => {
    res.render('contact/create', {alert: false});
};


// Renderizar vista para eliminar un contacto (básicamente solo sirve para mostrar la alerta)
const viewDelete = (req, res) => {
    res.render('contact/delete',  {alert: false});
};


// Realizar el renderizado de la vista para editar un contacto
const viewUpdate = (req, res) => {
    try {
        // Tomamos el id y desciframos el token para obtener el usuario
        const id = req.params.id;
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.JWT_CLAVE)
        const userName = verified.userName;
        // Buscamos el contacto en la base de datos tomando como referencia el id y el usuario
        const sql = `SELECT * FROM contactos WHERE id = '${id}' AND userName = '${userName}'`;
        // Realizamos la consulta
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                // Renderizamos la vista con los datos del contacto
                datos = result.rows[0];
                res.render('contact/update', {datos, alert: false, existe: true});
            }
        });
    } catch(error) {
        res.status(500).send(error);
    }
};


// Controladores para POST
const createContact = (req, res) => {
    try {
        // Capturamos los datos del formulario
        const username = req.user.username;
        const name = req.body.name;
        const email = req.body.email;
        const telefono = req.body.telefono;
        // Validamos que los campos obligatorios no esten vacios
        if (name && telefono) {
            // Agregar a los contactos
            const sql = `INSERT INTO contactos(nombre, email, telefono, username) VALUES ('${name}', '${email}', '${telefono}', '${username}')`;
            // Realizamos la consulta y enviamos un mensaje de confirmación que se mostrara con sweetalert según el caso
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


// Controlador para eliminar un contacto
const deleteContact = (req, res) => {
    try {
        // Capturamos el id y desciframos el token para obtener el usuario
        const id = req.params.id;
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.JWT_CLAVE)
        const userName = verified.userName;
        // Eliminamos el contacto en la base de datos tomando como referencia el id y el usuario
        const sql = `DELETE FROM contactos WHERE id = '${id}' AND userName = '${userName}'`;
        // Ejecutamos el script y enviamos un mensaje de confirmación que se mostrara con sweetalert según el caso
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


// Controlador para actualizar un contacto
const updateContact = (req, res) => {
    try {
        const id = req.params.id;
        const token = req.cookies.token;
        const verified = jwt.verify(token, process.env.JWT_CLAVE)
        const userName = verified.userName;
        const sql = `UPDATE contactos SET nombre = '${req.body.name}', email = '${req.body.email}', telefono = '${req.body.telefono}' WHERE id = '${id}' AND userName = '${userName}'`;
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                res.render('contact/update', {
                    alert: true,
                    alertTitle: 'Ups algo ha fallado',
                    alertMessage: 'No se ha podido actualizar el contacto',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 800,
                    ruta: 'contact/all',
                    existe: false
                });
            } else {
                res.render('contact/update', {
                    alert: true,
                    alertTitle: 'Actualización exitosa',
                    alertMessage: 'Se ha actualizado el contacto correctamente',
                    alertIcon: 'success',
                    showConfirmButton: true,
                    timer: 800,
                    ruta: 'contact/all',
                    existe: false
                });
            }
        });
    } catch(error) {
        res.status(500).send(error);
    }
};


// Exportamos las funciones
module.exports = {all, viewUpdate, deleteContact, updateContact, viewCreate, createContact, viewDelete};