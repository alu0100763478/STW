'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LibrosSchema = Schema({
  name: String,
  autor: String,
  picture: String,
  categoria: { type: String, enum:['Policial','Romántica','Aventura','Terror'
  ,'Ficción','Investigación','Biográfica','Infantil','Autoayuda','Erótica'
  ,'Hogar','Enciclopedia','Política','Economía','Sociedad','Deportes','Viajes'
  ,'Otros temas']},
  descripcion: String,
  year: Number,
  url: String
})

module.exports = mongoose.model('Libro',LibrosSchema)
