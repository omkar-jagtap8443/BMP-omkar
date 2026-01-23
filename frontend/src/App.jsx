
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserDashboard from './pages/UserDashboard';
import TravelerDashboard from './pages/TravelerDashboard';
import TravelerSignUp from './components/TravelerSignUp';
import TravelerLogin from './components/TravelerLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/traveler" element={<TravelerDashboard />} />
        <Route path="/traveler-signup" element={<TravelerSignUp />} />
        <Route path="/traveler-login" element={<TravelerLogin />} />
      </Routes>
    </Router>
  );
}

export default App
