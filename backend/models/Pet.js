const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    trim: true
  },
 
  birthDate: {
    type: Date,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  }
}, { timestamps: true }); 
module.exports = mongoose.model('Pet', petSchema);
