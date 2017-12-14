'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Producto = require('./models/producto')
const path = require('path');

const app = express()

app.use(express.static(__dirname + '/cliente'));

app.set('port', (process.env.PORT || 8080)); 

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res){
  //res.send({ message:'Hola mundo' })
	res.sendFile(path.join('index.html'));
	
});

app.get('/api/product/:producID', (req,res) => {
})

app.post('/api/product', (req,res) => {
	console.log('POST /api/producto')
	console.log(req.body)

//Creamos una variable llamada producto
	let producto = new Producto()
	producto.name = req.body.name
	producto.pricture = req.body.picture
	producto.categoria = req.body.categoria
	producto.descripcion = req.body.descripcion
	producto.url = req.body.url

	producto.save((err,productoStored) => {
		if (err) res.status(500).send({mensagge: `Error al salvar en la base de datos: ${err}`})
	})
	res.status(200).send({producto: productoStored})
})

app.put('/api/product/:producID', (req,res) => {
})

app.delete('/api/product/:producID', (req,res) => {
})

mongoose.connect('mongodb://localhost:27017/shop', (err,res) => {
	if(err){
		console.log(`Error al conectar la base de datos: ${err}`)
	}
	console.log('Conexion a la base de datos establecida...')
	app.listen(app.get('port'), function() {
		console.log("Node app is running at localhost:" + app.get('port'));
	});
})
