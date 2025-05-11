import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OwnerForme = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [adresse, setAdresse] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/owners', {
        firstName, lastName, adresse, city, phone
      });
      navigate(`/owners/${res.data._id}`);
    } catch (err) {
      console.error('Erreur :', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Ajouter un propriétaire</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>Prénom</Form.Label>
          <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Nom</Form.Label>
          <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="adresse">
          <Form.Label>Adresse</Form.Label>
          <Form.Control value={adresse} onChange={(e) => setAdresse(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Telephone</Form.Label>
          <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </Form.Group>


        <Button className="btn-outline-green" type="submit">Ajouter</Button>
      </Form>
    </div>
  );
};

export default OwnerForme;
