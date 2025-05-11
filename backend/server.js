const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ownerRoutes = require('./routes/owners');
const petRoutes = require('./routes/pets');
const vetRoutes = require('./routes/vets');
const visitRoutes = require('./routes/visits');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/vetcare360');

app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/vets', vetRoutes);
app.use('/api/visits', visitRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
