const {pool} = require('./../connections');

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
    res.render('contact/create');
};


const viewDelete = (req, res) => {
    res.render('contact/delete');
};


const viewUpdate = (req, res) => {
    res.render('contact/update');
};


// Controladores para POST
const createContact = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const userName = req.body.userName;
    const sql = `INSERT INTO users(name, email, telefono, userName) VALUES('${name}', '${email}', '${telefono}', '${userName}')`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/contact/all', {cod: 'error'});
        } else {
            res.redirect('/contact/all', {cod: 'ok'});
        }
    });
};


const deleteContact = (req, res) => {
    res.send("Borrando usuario: " + req.params.id);
};


const updateContact = (req, res) => {
    res.send("Actualizando usuario: " + req.params.id);
};


// Exportamos las funciones
module.exports = {all, viewDelete, viewUpdate, deleteContact, updateContact, viewCreate, createContact};