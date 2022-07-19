const express = require('express');
const router = express.Router();
const contactsControllers = require('./../controllers/inicio');

// Rutas:
// GET:
router.get('/', contactsControllers.inicio);
router.get('/login', contactsControllers.viewLogin);
router.get('/register', contactsControllers.viewRegister);
router.get('/logout', contactsControllers.logout);

// POST
router.post('/login', contactsControllers.login);
router.post('/register', contactsControllers.register);


// Exportar rutas
module.exports = router;