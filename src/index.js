// Modules imports
const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const routeContacts = require('./routes/contacts');
const routeInicio = require('./routes/inicio');
const cookieParser = require('cookie-parser');
// Para que heroku no nos bloquee el acceso
const cors = require('cors');
app.use(cors());

// Settings
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


// Routes
app.use('/contact', routeContacts);
app.use(routeInicio);

//Para eliminar la cache 
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

// Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})