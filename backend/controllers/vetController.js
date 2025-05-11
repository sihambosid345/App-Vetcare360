const Vet = require('../models/Vet');

// Ajouter un vétérinaire
exports.addVet = async (req, res) => {
  const { firstName, lastName, specialty } = req.body;

  try {
    const vet = new Vet({ firstName, lastName, specialty });
    await vet.save();
    res.status(201).json(vet);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout du vétérinaire", error });
  }
};

// Obtenir la liste des vétérinaires
exports.getAllVets = async (req, res) => {
  try {
    const vets = await Vet.find();
    res.json(vets);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des vétérinaires", error });
  }
};

// Obtenir un vétérinaire par ID
exports.getVetById = async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id);
    if (!vet) {
      return res.status(404).json({ message: 'Vétérinaire non trouvé' });
    }
    res.json(vet);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du vétérinaire', error });
  }
};
