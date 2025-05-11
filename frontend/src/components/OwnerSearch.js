import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';

export default function OwnerSearch() {
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!lastName.trim()) {
      alert("Veuillez entrer un nom de famille.");
      return;
    }
    navigate(`/owners?lastName=${lastName}`);
  };

  return (
    <div className="container mt-4">
      <h2>Find Owners</h2>
      <input
        type="text"
        className="form-control mb-2"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <button className="btn-outline-green me-2" onClick={handleSearch}>
       Find Owner
      </button>
      <button className="btn-outline-green" onClick={() => navigate('/owners/new')}>
        Add Owner
      </button>
    </div>
  );
}
