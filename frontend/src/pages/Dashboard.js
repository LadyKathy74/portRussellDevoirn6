import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    axios.get('http://localhost:5000/catways', { headers })
      .then(res => {
        const catwayIds = res.data.map(c => c.catwayNumber);
        return Promise.all(
          catwayIds.map(id =>
            axios.get(`http://localhost:5000/catways/${id}/reservations`, { headers })
          )
        );
      })
      .then(results => {
        const allReservations = results.flatMap(r => r.data);
        const today = new Date();
        const active = allReservations.filter(r =>
          new Date(r.startDate) <= today && new Date(r.endDate) >= today
        );
        setReservations(active);
      })
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <h1>Tableau de bord</h1>
      {user && (
        <div>
          <p>👤 Utilisateur : {user.username}</p>
          <p>📧 Email : {user.email}</p>
        </div>
      )}
      <p>📅 Date : {new Date().toLocaleDateString()}</p>

      <nav>
        <Link to="/catways">🛠️ Catways</Link>
        <Link to="/reservations">📋 Réservations</Link>
        <Link to="/users">👥 Utilisateurs</Link>
        <Link to="/documentation">📄 Documentation</Link>
        <button onClick={handleLogout}>🚪 Se déconnecter</button>
      </nav>

      <h2>Réservations en cours</h2>
      <ul>
        {reservations.map(r => (
          <li key={r._id}>
            ⛵ {r.boatName} — {r.clientName} (Catway #{r.catwayNumber}) du {r.startDate.slice(0, 10)} au {r.endDate.slice(0, 10)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;