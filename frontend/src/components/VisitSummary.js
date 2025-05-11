import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function VisitSummary() {
  const { ownerId } = useParams();
  const [owner, setOwner] = useState({});
  const [pets, setPets] = useState([]);
  const [visitsByPet, setVisitsByPet] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/owners/${ownerId}`).then(async res => {
      setOwner(res.data.owner);
      setPets(res.data.pets);

      const visits = {};
      for (const pet of res.data.pets) {
        const resVisit = await axios.get(`http://localhost:5000/api/visits/pet/${pet._id}`);
        visits[pet._id] = resVisit.data;
      }
      setVisitsByPet(visits);
    });
  }, [ownerId]);

  return (
    <div className="container mt-4">
      <h2>Synthèse de {owner.firstName} {owner.lastName}</h2>
      {pets.map(p => (
        <div key={p._id} className="mb-4">
          <h5>{p.name}</h5>
          <ul className="list-group">
            {(visitsByPet[p._id] || []).map(v => (
              <li key={v._id} className="list-group-item">
                {new Date(v.date).toLocaleDateString()} - {v.notes}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
