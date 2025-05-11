import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './global.css';

export default function OwnerResult() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/owners/${id}`);
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        const data = await res.json();
        setOwner(data.owner);
        setPets(data.pets || []);
        console.log('Owner loaded:', data);
      } catch (error) {
        console.error('Erreur lors du chargement du propriétaire :', error);
      }
    };

    fetchOwner();
  }, [id]);

  if (!owner) return <p>Chargement...</p>;

  return (
    <div className="container mt-4">
      <h2>Owner Information</h2>
      <table className="info-table table table-bordered">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{owner.firstName} {owner.lastName}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{owner.adresse || '-'}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{owner.city || '-'}</td>
          </tr>
          <tr>
            <th>Telephone</th>
            <td>{owner.phone || '-'}</td>
          </tr>
        </tbody>
      </table>

      <div className="btn-group mb-4">
        <Link to={`/owners/${id}/edit`} className="btn-outline-green">
          Edit Owner
        </Link>
        <Link to={`/owners/${id}/pets/new`} className="btn-outline-green">
          Add New Pet
        </Link>
      </div>

      <h4>Pets and Visits</h4>
      {pets.length > 0 ? (
        <ul>
          {pets.map((pet) => (
            <li key={pet._id}>
              {pet.name} ({pet.species}) - Born: {pet.birthDate ? pet.birthDate.split('T')[0] : '-'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pets registered.</p>
      )}
    </div>
  );
}
