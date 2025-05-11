const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  pet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pet', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  notes: { 
    type: String, 
    trim: true 
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Visit', visitSchema);
