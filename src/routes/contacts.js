const express = require('express');
const router = express.Router();
const contactsControllers = require('./../controllers/contacts');
const verifyToken = require('./../middlewares/isVerify');

// Rutas:
// GET:
router.get('/all', verifyToken,contactsControllers.all);
router.get('/create', verifyToken, contactsControllers.viewCreate);
router.get('/delete', verifyToken, contactsControllers.viewDelete);
router.get('/update/:id', verifyToken, contactsControllers.viewUpdate);

// POST:
router.post('/create', verifyToken, contactsControllers.createContact);
router.post('/delete/:id', verifyToken, contactsControllers.deleteContact);
router.post('/update/:id', verifyToken, contactsControllers.updateContact);


// Exportar ruta
module.exports = router;