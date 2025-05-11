const Owner = require('../models/Owner');

// Ajouter un propriétaire
exports.addOwner = async (req, res) => {
  const { firstName, lastName, phone, adresse, city, pets } = req.body;

  try {
    const owner = new Owner({ firstName, lastName, phone, adresse, city });

    await owner.save();
    res.status(201).json(owner);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de l\'ajout du propriétaire', error: err });
  }
};

// Extrait d'un controller
exports.getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find(); // .populate('pets') si nécessaire
    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.searchOwner = async (req, res) => {
  try {
    const lastName = req.query.lastName || '';
    const regex = new RegExp(lastName, 'i'); // recherche insensible à la casse
    const owners = await Owner.find({ lastName: regex });
    res.json(owners);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la recherche du propriétaire', error: err });
  }
};
