import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './global.css';

export default function OwnerDetails() {
  const { id } = useParams();
  const [owner, setOwner] = useState({});
  const [pets, setPets] = useState([]);
  const [visitsByPet, setVisitsByPet] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwner = async () => {
      const res = await axios.get(`http://localhost:5000/api/owners/${id}`);
      setOwner(res.data.owner);
      setPets(res.data.pets);

      const visitsMap = {};
      for (const pet of res.data.pets) {
        const resVisit = await axios.get(`http://localhost:5000/api/visits/pet/${pet._id}`);
        visitsMap[pet._id] = resVisit.data;
      }
      setVisitsByPet(visitsMap);
    };

    fetchOwner();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Owner Information</h3>
      <table className="table table-bordered">
        <tbody>
          <tr><th>Name</th><td>{owner.firstName} {owner.lastName}</td></tr>
          <tr><th>Address</th><td>{owner.adresse || '—'}</td></tr>
          <tr><th>City</th><td>{owner.city || '—'}</td></tr>
          <tr><th>Telephone</th><td>{owner.phone}</td></tr>
        </tbody>
      </table>

      <div className="mb-4">
        <button className="btn-outline-green" onClick={() => navigate(`/owners/${id}/edit`)}>Edit Owner</button>
        <button className="btn-outline-green" onClick={() => navigate(`/owners/${id}/pets/new`)}>Add New Pet</button>
      </div>

      <h4>Pets and Visits</h4>
      {pets.map(pet => (
        <div key={pet._id} className="border p-3 mb-3 bg-light">
          <h5>Name: {pet.name}</h5>
          <p><strong>Birth Date:</strong> {pet.birthDate ? pet.birthDate.split('T')[0] : '—'}</p>
          <p><strong>Type:</strong> {pet.species}</p>
          <div className="mb-2">
            <button className="btn-outline-green" onClick={() => navigate(`/pets/${pet._id}/edit`)}>Edit Pet</button>
            <button className="btn-outline-green" onClick={() => navigate(`/pets/${pet._id}/visits/new`)}>Add Visit</button>
          </div>
          {visitsByPet[pet._id] && visitsByPet[pet._id].length > 0 && (
            <table className="table table-sm">
              <thead>
                <tr><th>Visit Date</th><th>Description</th></tr>
              </thead>
              <tbody>
                {visitsByPet[pet._id].map(visit => (
                  <tr key={visit._id}>
                    <td>{new Date(visit.date).toLocaleDateString()}</td>
                    <td>{visit.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
