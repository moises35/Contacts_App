const {pool} = require('./../connections');
const bcrypt = require('bcrypt');

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
    const sql = `SELECT * FROM users WHERE userName = ${userName}`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.redirect('/inicio', {cod: 'error'});
        } else {
            if (result.rows.length > 0) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.user = user;
                    res.render('/contact/all');
                } else {
                    // res.('/inicio', {cod: 'no'});
                }
            } else {
                res.redirect('/inicio', {cod: 'nologin'});
            }
        }
    });
    
};


const register = (req, res) => {
    const name = req.body.name;
    const password = bcrypt.hashSync(req.body.password, 10);
    const userName = req.body.userName;
    const sql = `INSERT INTO users(name, password, userName) VALUES (${name}, ${password}, ${userName})`;
    pool.query(sql, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/inicio', {cod: 'no'});
        } else {
            res.redirect('/inicio', {cod: 'ok'});
        }
    });
};


module.exports = { viewLogin, viewRegister, login, register, inicio};