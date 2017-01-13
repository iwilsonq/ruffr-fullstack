const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = Schema({
  local: {
    name: String,
    email: String,
    password: String
  }
});

userSchema.methods.generateHash = function (password) {
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validateHash = function (password) {
  bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
