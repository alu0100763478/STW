'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RelatoSchema = Schema({
  titulo: String,
  id_autor: String,
  picture: String,
  textoRelato: String,
  categoria: String,
  usuario: String,
  descripcion: String,
  fecha: Number,
  positivo: Number,
  negativo: Number
})

module.exports = mongoose.model('Relato',RelatoSchema)