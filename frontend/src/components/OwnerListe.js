import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OwnerList() {
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/owners${search}`);
        setOwners(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchOwners();
  }, [search]);

  return (
    <div className="container mt-4">
      <h2>Owners</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Telephone</th>
            <th>Pets</th>
          </tr>
        </thead>
        <tbody>
          {owners.length === 0 ? (
            <tr><td colSpan="5" className="text-center">Aucun propriétaire trouvé.</td></tr>
          ) : (
            owners.map(owner => (
              <tr key={owner._id}>
                <td>
                  <button className="btn-outline-green" onClick={() => navigate(`/owners/${owner._id}/details`)}>
                    {owner.firstName} {owner.lastName}
                  </button>
                </td>
                <td>{owner.adresse || '—'}</td>
                <td>{owner.city || '—'}</td>
                <td>{owner.phone}</td>
    
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
