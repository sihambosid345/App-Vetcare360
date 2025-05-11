const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');

router.post('/', async (req, res) => {
  try {
    console.log(" Données reçues pour la visite :", req.body); 

    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).json(visit);
  } catch (err) {
    console.error(' Erreur lors de l\'ajout de la visite :', err);
    res.status(500).send('Erreur lors de l\'ajout de la visite');
  }
});



router.get('/pet/:petId', async (req, res) => {
  try {
    const visits = await Visit.find({ pet: req.params.petId }).sort({ date: -1 });
    res.json(visits);
  } catch (err) {
    console.error('Erreur lors de la récupération des visites :', err);
    res.status(500).send('Erreur lors du chargement des visites');
  }
});

module.exports = router;
