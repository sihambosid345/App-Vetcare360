const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  adresse: {
    type: String,
    default: '',
    trim: true
  },
  city: {
    type: String,
    default: '',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    trim: true
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Owner', ownerSchema);
