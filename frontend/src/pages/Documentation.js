import React from 'react';

function Documentation() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>📄 Documentation de l'API PortRussel</h1>
      <p>Cette API permet de gérer les utilisateurs, les catways et les réservations du port de plaisance Russell.</p>

      <h2>🔐 Authentification</h2>
      <ul>
        <li><strong>POST /login</strong> — Connexion d’un utilisateur</li>
        <li><strong>GET /logout</strong> — Déconnexion</li>
      </ul>

      <h2>👥 Utilisateurs</h2>
      <ul>
        <li><strong>GET /users</strong> — Liste tous les utilisateurs</li>
        <li><strong>GET /users/:email</strong> — Détails d’un utilisateur</li>
        <li><strong>POST /users</strong> — Créer un utilisateur</li>
        <li><strong>PUT /users/:email</strong> — Modifier un utilisateur</li>
        <li><strong>DELETE /users/:email</strong> — Supprimer un utilisateur</li>
      </ul>

      <h2>🛠️ Catways</h2>
      <ul>
        <li><strong>GET /catways</strong> — Liste tous les catways</li>
        <li><strong>GET /catways/:id</strong> — Détails d’un catway</li>
        <li><strong>POST /catways</strong> — Créer un catway</li>
        <li><strong>PUT /catways/:id</strong> — Modifier l’état d’un catway</li>
        <li><strong>DELETE /catways/:id</strong> — Supprimer un catway</li>
      </ul>

      <h2>📋 Réservations</h2>
      <ul>
        <li><strong>GET /catways/:id/reservations</strong> — Liste des réservations pour un catway</li>
        <li><strong>GET /catways/:id/reservations/:idReservation</strong> — Détails d’une réservation</li>
        <li><strong>POST /catways/:id/reservations</strong> — Créer une réservation</li>
        <li><strong>PUT /catways/:id/reservations/:idReservation</strong> — Modifier une réservation</li>
        <li><strong>DELETE /catways/:id/reservations/:idReservation</strong> — Supprimer une réservation</li>
      </ul>

      <h2>📦 Exemple d’usage</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '5px' }}>
{`POST /login
Body:
{
  "email": "admin@port.fr",
  "password": "secure123"
}

GET /catways
Headers:
Authorization: Bearer <token>`}
      </pre>
    </div>
  );
}

export default Documentation;