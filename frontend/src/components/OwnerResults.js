import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './global.css';

export default function OwnerResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const firstName = params.get('firstName');

    const fetchOwners = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/owners?firstName=${firstName}`);
        if (!res.ok) throw new Error("Erreur HTTP");
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error('Erreur:', error);
        alert("Erreur lors du chargement !");
      }
    };

    if (firstName) fetchOwners();
  }, [location.search]);

  return (
    <div className="container mt-4">
      <h2>Résultat de recherche</h2>
      {results.length === 0 ? (
        <p>Aucun propriétaire trouvé.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Nom</th>
              <th>Adresse</th>
              <th>City</th>
              <th>Téléphone</th>
              <th>Animaux</th>
            </tr>
          </thead>
          <tbody>
            {results.map(owner => (
              <tr key={owner._id}>
                <td>
                  <button className="btn-outline-green" onClick={() => navigate(`/owners/${owner._id}/details`)}>
                    {owner.firstName} {owner.lastName}
                  </button>
                </td>
                <td>{owner.adresse || '-'}</td>
                <td>{owner.city || '-'}</td>
                <td>{owner.phone}</td>
                <td>{owner.pets?.map(p => p.name).join(', ') || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
