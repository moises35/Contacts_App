const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const routeContacts = require('./routes/contacts');

// Settings
require('dotenv').config();


// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use(routeContacts);

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})