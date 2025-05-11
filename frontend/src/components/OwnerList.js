import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './global.css';

export default function OwnerList() {
  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const getSearchParam = () => {
    const params = new URLSearchParams(location.search);
    return params.get('lastName') || '';
  };

  const fetchOwners = async (searchQuery = '') => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/owners?lastName=${searchQuery}&includePets=true`
      );
      setOwners(res.data); 
    } catch (err) {
      console.error('Erreur lors du chargement des propriétaires :', err);
    }
  };

  useEffect(() => {
    const lastName = getSearchParam();
    setSearch(lastName);
    fetchOwners(lastName);
  }, [location.search]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this owner")) {
      try {
        await axios.delete(`http://localhost:5000/api/owners/${id}`);
        alert("Owner deleted!");
        fetchOwners(search);
      } catch (err) {
        console.error('Erreur lors de la suppression :', err);
        alert("Erreur lors de la suppression !");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/owners?lastName=${search}`);
  };

  return (
    <div className="container mt-4">
      <h2>Owners</h2>

      <form onSubmit={handleSearch} className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn-outline-green" type="submit">Find Owner</button>
      </form>

      <table className="table table-striped table-bordered owner-table">
        <thead className="table-dark">
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Ville</th>
            <th>Téléphone</th>
            <th>Animaux</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.length > 0 ? (
            owners.map((item) => {
              const currentOwner = item.owner || item;
              const pets = item.pets || [];

              return (
                <tr key={currentOwner._id}>
                  <td>
                    <button
                      className="btn btn-link p-0 text-primary"
                      onClick={() => navigate(`/owners/${currentOwner._id}/details`)}
                    >
                      {currentOwner.firstName} {currentOwner.lastName}
                    </button>
                  </td>
                  <td>{currentOwner.adresse || '—'}</td>
                  <td>{currentOwner.city || '—'}</td>
                  <td>{currentOwner.phone || '—'}</td>
                  <td>{pets.length > 0 ? pets.map(p => p.name).join(', ') : '—'}</td>
                  <td>
                    <button
                      className="btn-outline-green"
                      onClick={() => navigate(`/owners/${currentOwner._id}/edit`)}
                    >
                      Update
                    </button>
                    <button
                      className="btn-outline-green"
                      onClick={() => handleDelete(currentOwner._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No owners found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
