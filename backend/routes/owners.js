const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');
const Pet = require('../models/Pet');


router.get('/', async (req, res) => {
  try {
    const { name } = req.query;

    let filter = {};

    if (name) {
      filter = {
        $or: [
          { firstName: { $regex: name, $options: 'i' } },
          { lastName: { $regex: name, $options: 'i' } }
        ]
      };
    }

    const owners = await Owner.find(filter);
    res.json(owners);
  } catch (err) {
    console.error('Erreur lors de la recherche de propriétaires:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


router.post('/', async (req, res) => {
  try {
    const owner = new Owner(req.body);
    await owner.save();
    res.json(owner);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur lors de l'ajout du propriétaire");
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).send("Propriétaire non trouvé");

    await Pet.deleteMany({ owner: req.params.id });
    await Owner.findByIdAndDelete(req.params.id);

    res.sendStatus(204);
  } catch (err) {
    console.error('Erreur lors de la suppression :', err);
    res.status(500).send('Erreur lors de la suppression');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur lors de la mise à jour");
  }
});


router.get('/:id', async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).send('Propriétaire non trouvé');

    const pets = await Pet.find({ owner: owner._id });
    res.json({ owner, pets });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la récupération du propriétaire');
  }
});

module.exports = router;
