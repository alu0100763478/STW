'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/product', (req,res) => {
	res.send(200,{ productos: []})
})

app.get('/api/product/:producID', (req,res) => {
})

app.post('/api/product', (req,res) => {
	console.log(req.body)
	res.send(200,{mensagge: 'El producto se ha recibido'})
})

app.put('/api/product/:producID', (req,res) => {
})

app.delete('/api/product/:producID', (req,res) => {
})

app.listen(port,() =>{
	console.log(`HOLA MUNDO en http://localhost:${port}`)
})
