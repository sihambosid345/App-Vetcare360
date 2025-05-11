const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Owner = require('../models/Owner');
const Visit = require('../models/Visit');

router.post('/', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error(" Erreur lors de l'ajout du pet :", err);
    res.status(500).send('Erreur lors de la création');
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send('Animal non trouvé pour mise à jour');
    res.json(updated);
  } catch (err) {
    console.error(" Erreur lors de la mise à jour :", err);
    res.status(500).send('Erreur mise à jour');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).send('Animal non trouvé');

    const owner = await Owner.findById(pet.owner);
    const visits = await Visit.find({ pet: pet._id }).sort({ date: -1 });

    res.json({ pet, owner, visits });
  } catch (err) {
    console.error(' Erreur dans GET /api/pets/:id :', err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
