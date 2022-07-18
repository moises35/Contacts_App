const {pool} = require('./../connections');

// Controladores para GET
const all = (req, res) => {
    const user = req.session.user;
    res.render('contact/all');
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
    res.send(`Creando usuario con datos: ${req.body.name}`);
};


const deleteContact = (req, res) => {
    res.send("Borrando usuario: " + req.params.id);
};


const updateContact = (req, res) => {
    res.send("Actualizando usuario: " + req.params.id);
};


// Exportamos las funciones
module.exports = {all, viewDelete, viewUpdate, deleteContact, updateContact, viewCreate, createContact};