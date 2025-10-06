import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('http://localhost:5000/users', { headers })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', form, { headers })
      .then(res => setUsers([...users, res.data]))
      .catch(err => console.error(err));
  };

  const handleDelete = (email) => {
    axios.delete(`http://localhost:5000/users/${email}`, { headers })
      .then(() => setUsers(users.filter(u => u.email !== email)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Gestion des Utilisateurs</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {users.map(u => (
          <li key={u.email}>
            {u.username} — {u.email}
            <button onClick={() => handleDelete(u.email)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;