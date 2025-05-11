import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PetForm = () => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [owner, setOwner] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newPet = { name, species, breed, owner };
      await axios.post('http://localhost:5000/api/pets/add', newPet);
      setMessage('Animal ajouté avec succès');
      setTimeout(() => navigate('/owner-search'), 2000);
    } catch (err) {
      setMessage('Erreur lors de l\'ajout de l\'animal');
    }
  };

  return (
    <div>
      <h2>Ajouter un Animal</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom de l'animal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formSpecies">
          <Form.Label>Espèce</Form.Label>
          <Form.Control
            type="text"
            placeholder="Espèce"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBreed">
          <Form.Label>Race</Form.Label>
          <Form.Control
            type="text"
            placeholder="Race"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formOwner">
          <Form.Label>Propriétaire</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID du propriétaire"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Ajouter</Button>
      </Form>

      {message && <Alert variant="success" className="mt-3">{message}</Alert>}
    </div>
  );
};

export default PetForm;
