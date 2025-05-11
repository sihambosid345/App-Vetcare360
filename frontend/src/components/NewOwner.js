import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewOwner() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    adresse: '',
    city: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/owners', form);
      navigate(`/owners/${res.data._id}/details`);
    } catch (err) {
      console.error("Erreur lors de l'ajout du propriétaire :", err);
      alert("Échec de l'ajout du propriétaire.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>New Owner</h2>
      <p>First Name</p>
      <input className="form-control mb-2" onChange={e => setForm({ ...form, firstName: e.target.value })} />
      <p>Last Name</p>
      <input className="form-control mb-2" onChange={e => setForm({ ...form, lastName: e.target.value })} />
      <p>Adresse</p>
      <input className="form-control mb-2" onChange={e => setForm({ ...form, adresse: e.target.value })} />
      <p>City</p>
      <input className="form-control mb-2" onChange={e => setForm({ ...form, city: e.target.value })} />
      <p>Telephone</p>
      <input className="form-control mb-2" onChange={e => setForm({ ...form, phone: e.target.value })} />
      <button className="btn-outline-green" onClick={handleSubmit}>Add Owner</button>
    </div>
  );
}
