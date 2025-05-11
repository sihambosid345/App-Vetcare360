import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddVisit() {
  const { id } = useParams(); 
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [visits, setVisits] = useState([]);
  const [form, setForm] = useState({ date: '', notes: '' });
  const navigate = useNavigate(); // <-- important !

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pets/${id}`);
        setPet(res.data.pet);
        setOwner(res.data.owner);
        setVisits(res.data.visits);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (!form.date || !form.notes) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/visits`, {
        ...form,
        pet: id
      });

      
      const refreshed = await axios.get(`http://localhost:5000/api/pets/${id}`);
      const ownerId = refreshed.data.owner?._id;

     
      navigate(`/owners/${ownerId}/details`);
    } catch (err) {
      console.error("Erreur d'ajout :", err);
      alert("Erreur lors de l'ajout");
    }
  };

  if (!pet || !owner) return <div className="container mt-4">Chargement...</div>;

  return (
    <div className="container mt-4">
      <h3>New Visit</h3>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Type</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{pet.name}</td>
            <td>{pet.birthDate?.split('T')[0]}</td>
            <td>{pet.species}</td>
            <td>{owner.firstName} {owner.lastName}</td>
          </tr>
        </tbody>
      </table>

      <div className="mb-3">
        <label>Date</label>
        <input
          type="date"
          className="form-control"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={form.notes}
          onChange={e => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      <button className="btn-outline-green" onClick={handleSubmit}>Add Visit</button>

      <h5>Previous Visits</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {visits.length === 0 ? (
            <tr><td colSpan="2">Aucune visite enregistrée.</td></tr>
          ) : (
            visits.map(v => (
              <tr key={v._id}>
                <td>{new Date(v.date).toLocaleDateString()}</td>
                <td>{v.notes}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
