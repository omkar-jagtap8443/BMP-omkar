import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App
