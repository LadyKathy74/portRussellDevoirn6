import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Catways() {
  const [catways, setCatways] = useState([]);
  const [form, setForm] = useState({ catwayNumber: '', catwayType: '', catwayState: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('http://localhost:5000/catways', { headers })
      .then(res => setCatways(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/catways', form, { headers })
      .then(res => setCatways([...catways, res.data]))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/catways/${id}`, { headers })
      .then(() => setCatways(catways.filter(c => c.catwayNumber !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Gestion des Catways</h2>
      <form onSubmit={handleSubmit}>
        <input name="catwayNumber" placeholder="Numéro" onChange={handleChange} required />
        <select name="catwayType" onChange={handleChange} required>
          <option value="">Type</option>
          <option value="long">Long</option>
          <option value="short">Short</option>
        </select>
        <input name="catwayState" placeholder="État" onChange={handleChange} required />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {catways.map(c => (
          <li key={c.catwayNumber}>
            #{c.catwayNumber} ({c.catwayType}) — {c.catwayState}
            <button onClick={() => handleDelete(c.catwayNumber)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catways;