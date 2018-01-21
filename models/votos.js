'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VotoSchema = Schema({
  usuario: String,
  titulo: String,
})

module.exports = mongoose.model('Voto',VotoSchema)