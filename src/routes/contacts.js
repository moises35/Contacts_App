const express = require('express');
const router = express.Router();
const contactsControllers = require('./../controllers/contacts');

// Rutas
router.get('/', contactsControllers.inicio);
router.get('/login', contactsControllers.viewLogin);
router.get('/register', contactsControllers.viewRegister);
router.post('/login', contactsControllers.login);
router.post('/register', contactsControllers.register);


// Exportar ruta
module.exports = router;