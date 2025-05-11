import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditPet() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pets/${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleSubmit = async () => {
    await axios.put(`http://localhost:5000/api/pets/${id}`, form);
    navigate(-1);
  };

  return (
    <div className="container mt-4">
      <h2>Pet</h2>
      <p>Name</p>
      <input className="form-control mb-2" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
      <p>Birth Date</p>
      <input className="form-control mb-2" value={form.birthDate || ''} onChange={e => setForm({ ...form, species: e.target.value })} />
      <p>Type</p>
      <input className="form-control mb-2" value={form.species || ''} onChange={e => setForm({ ...form, breed: e.target.value })} />
      <button className="btn-outline-green" onClick={handleSubmit}>Update Pet</button>
    </div>
  );
}
