const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  username: String,
  categorie: { type: String, enum : ['ens','etud'] , lowercase: true, trim: true},
  projects: [],
});

const User = mongoose.model('User', user);

module.exports = User;
