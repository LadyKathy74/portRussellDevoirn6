import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Catways from './pages/Catways';
import Reservations from './pages/Reservations';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catways" element={<Catways />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;