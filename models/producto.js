'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductoSchema = Schema({
  name: String,
  picture: String,
  categoria: { type: String, enum:['Policial','Romántica','Aventura','Terror'
  ,'Ficción','Investigación','Biográfica','Infantil','Autoayuda','Erótica'
  ,'Hogar','Enciclopedia','Política','Economía','Sociedad','Deportes','Viajes'
  ,'Otros temas']},
  descripcion: String
})

module.exports = mongoose.model('Producto', ProductoSchema)
