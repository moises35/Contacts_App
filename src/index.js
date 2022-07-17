// Modules imports
const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const routeContacts = require('./routes/contacts');
const routeInicio = require('./routes/inicio');

// Settings
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routes
app.use('/contact', routeContacts);
app.use(routeInicio);


// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})