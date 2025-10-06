import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    catwayNumber: '',
    clientName: '',
    boatName: '',
    startDate: '',
    endDate: ''
  });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('http://localhost:5000/catways', { headers })
      .then(res => {
        const allCatways = res.data.map(c => c.catwayNumber);
        Promise.all(
          allCatways.map(id =>
            axios.get(`http://localhost:5000/catways/${id}/reservations`, { headers })
          )
        ).then(results => {
          const allReservations = results.flatMap(r => r.data);
          setReservations(allReservations);
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/catways/${form.catwayNumber}/reservations`, form, { headers })
      .then(res => setReservations([...reservations, res.data]))
      .catch(err => console.error(err));
  };

  const handleDelete = (catwayNumber, idReservation) => {
    axios.delete(`http://localhost:5000/catways/${catwayNumber}/reservations/${idReservation}`, { headers })
      .then(() => setReservations(reservations.filter(r => r._id !== idReservation)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Gestion des Réservations</h2>
      <form onSubmit={handleSubmit}>
        <input name="catwayNumber" placeholder="Numéro Catway" onChange={handleChange} required />
        <input name="clientName" placeholder="Nom Client" onChange={handleChange} required />
        <input name="boatName" placeholder="Nom Bateau" onChange={handleChange} required />
        <input name="startDate" type="date" onChange={handleChange} required />
        <input name="endDate" type="date" onChange={handleChange} required />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {reservations.map(r => (
          <li key={r._id}>
            Catway #{r.catwayNumber} — {r.clientName} ({r.boatName}) du {r.startDate.slice(0, 10)} au {r.endDate.slice(0, 10)}
            <button onClick={() => handleDelete(r.catwayNumber, r._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservations;