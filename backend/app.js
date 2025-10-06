const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const authMiddleware = require('./middleware/authMiddleware');

app.use('/users', authMiddleware, userRoutes);
app.use('/catways', authMiddleware, catwayRoutes);
app.use('/catways/:id/reservations', authMiddleware, reservationRoutes);
app.use('/', authRoutes);

module.exports = app;