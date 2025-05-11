const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vetcare360', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
