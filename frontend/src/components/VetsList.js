import { useEffect, useState } from 'react';
import axios from 'axios';
import './global.css'; 

export default function VetsList() {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/vets')
      .then(res => setVets(res.data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Veterinarians</h2>
      <table className="table table-bordered table-striped vet-table">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Specialties</th>
          </tr>
        </thead>
        <tbody>
          {vets.map(vet => (
            <tr key={vet._id}>
              <td>{vet.name}</td>
              <td>{vet.specialization && vet.specialization !== '' ? vet.specialization : 'none'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
