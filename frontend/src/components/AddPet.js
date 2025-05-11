import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddPet() {
  const { id } = useParams(); 
  const [form, setForm] = useState({ name: '', species: '', birthDate: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/pets', { ...form, owner: id });
      navigate(`/owners/${id}/details`);
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'animal :", err);
      alert("Échec de l'ajout de l'animal.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>New Pet</h2>
      <p>Name</p>
      <input
        className="form-control mb-2"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <p>Birth Date</p>
      <input
        type="date"
        className="form-control mb-2"
        onChange={e => setForm({ ...form, birthDate: e.target.value })}
      />
      <p>Type</p>
      <select
        className="form-control mb-2"
        value={form.species}
        onChange={e => setForm({ ...form, species: e.target.value })}
      >
        <option value="">---type---</option>
        <option value="bird">Bird</option>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
        <option value="hamster">Hamster</option>
        <option value="lizard">Lizard</option>
        <option value="snake">Snake</option>
        <option value="turtle">Turtle</option>
        <option value="rabbit">Rabbit</option>
      </select>

      <button className="btn-outline-green" onClick={handleSubmit}>Add Pet</button>
    </div>
  );
}
