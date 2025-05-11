const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  name: String,
  specialization: String
});

module.exports = mongoose.model('Vet', vetSchema);
