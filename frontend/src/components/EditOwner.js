import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditOwner() {
  const { id } = useParams();
  const [form, setForm] = useState({ firstName: '', lastName: '', adresse: '' , city: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/owners/${id}`).then(res => setForm(res.data.owner));
  }, [id]);
  
  const handleSubmit = async () => {
    await axios.put(`http://localhost:5000/api/owners/${id}`, form);
    navigate(`/owners/${id}`);
  };
  
  return (
    <div className="container mt-4">
      <h2>Owner</h2>
      <input value={form.firstName} className="form-control mb-2" onChange={e => setForm({ ...form, firstName: e.target.value })} />
      <input value={form.lastName} className="form-control mb-2" onChange={e => setForm({ ...form, lastName: e.target.value })} />
      <input value={form.adresse} className="form-control mb-2" onChange={e => setForm({ ...form, adresse: e.target.value })} />
      <input value={form.city} className="form-control mb-2" onChange={e => setForm({ ...form, city: e.target.value })} />
      <input value={form.phone} className="form-control mb-2" onChange={e => setForm({ ...form, phone: e.target.value })} />
      <button className="btn-outline-green" onClick={handleSubmit}>Update Owner</button>
    </div>
  );
}
