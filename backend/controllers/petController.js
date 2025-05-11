const Pet = require('../models/Pet');

// Ajouter un animal
exports.addPet = async (req, res) => {
  const { name, species, breed, owner } = req.body;
  try {
    const pet = new Pet({ name, species, breed, owner });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de l\'animal', error: err });
  }
};

// Liste des animaux
exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner');
    res.json(pets);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la récupération des animaux', error: err });
  }
};
