const express = require('express');
const router = express.Router();
const contactsControllers = require('./../controllers/contacts');

// Rutas:
// GET:
router.get('/all', contactsControllers.all);
router.get('/create', contactsControllers.viewCreate);
router.get('/delete/:id', contactsControllers.viewDelete);
router.get('/update/:id', contactsControllers.viewUpdate);

// POST:
router.post('/create', contactsControllers.createContact);
router.post('/delete/:id', contactsControllers.deleteContact);
router.post('/update/:id', contactsControllers.updateContact);


// Exportar ruta
module.exports = router;