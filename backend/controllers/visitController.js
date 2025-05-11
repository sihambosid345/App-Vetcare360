const Visit = require('../models/Visit');

// Ajouter une visite
exports.addVisit = async (req, res) => {
  const { pet, date, reason, notes } = req.body;
  try {
    const visit = new Visit({ pet, date, reason, notes });
    await visit.save();
    res.status(201).json(visit);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout de la visite', error: err });
  }
};

// Liste des visites pour un animal
exports.getVisits = async (req, res) => {
  try {
    const visits = await Visit.find({ pet: req.params.petId });
    res.json(visits);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la récupération des visites', error: err });
  }
};
