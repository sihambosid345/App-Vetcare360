
const express = require('express');
const router = express.Router();
const Vet = require('../models/Vet');

router.get('/', async (req, res) => {
  try {
    const vets = await Vet.find();
    res.json(vets);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la récupération des vétérinaires');
  }
});

module.exports = router;
