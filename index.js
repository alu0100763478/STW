'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url_login = require('./config/database');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const app = express();

require('./config/passport')(passport);

// setting
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'proyectoSTW201718',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./app/routes')(app,passport);

//static files
app.use(express.static(__dirname + '/public'));

//conexion a base de datos 
mongoose.connect(url_login.url,{useMongoClient: true,}, (err,res) => {
	
	if(err){
		console.log(`Error al conectar la base de datos: ${err}`)
	}
	console.log('Conexion a la base de datos establecida...')
	app.listen(app.get('port'), function() {
		console.log("Node app is running at localhost:" + app.get('port'));
	});
});
