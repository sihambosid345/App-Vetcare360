import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VisitForm = () => {
  const [pet, setPet] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newVisit = { pet, date, reason, notes };
      await axios.post('http://localhost:5000/api/visits/add', newVisit);
      setMessage('Visite ajoutée avec succès');
      setTimeout(() => navigate('/owner-search'), 2000);
    } catch (err) {
      setMessage('Erreur lors de l\'ajout de la visite');
    }
  };

  return (
    <div>
      <h2>Ajouter une Visite</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPet">
          <Form.Label>Animal</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID de l'animal"
            value={pet}
            onChange={(e) => setPet(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formReason">
          <Form.Label>Raison</Form.Label>
          <Form.Control
            type="text"
            placeholder="Raison de la visite"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Détails supplémentaires"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Ajouter Visite</Button>
      </Form>

      {message && <Alert variant="success" className="mt-3">{message}</Alert>}
    </div>
  );
};

export default VisitForm;
