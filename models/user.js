'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = Schema({
  email: String,
  username: String,
  password: String
});

UserSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

UserSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User',UserSchema);