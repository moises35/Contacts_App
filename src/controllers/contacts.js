// const {pool} = require('./../connections');

const inicio = (req, res) => {
    res.render('index');
}


const viewLogin = (req, res) => {
    res.send('Login');
};


const viewRegister = (req, res) => {
    res.send('Register');
};


const login = (req, res) => {
    const datos = req.body;
    console.log(datos);
};


const register = (req, res) => {
    const datos = req.body;
    console.log(datos);
};


module.exports = { viewLogin, viewRegister, login, register, inicio};