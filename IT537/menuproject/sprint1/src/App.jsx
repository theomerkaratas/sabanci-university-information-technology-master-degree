import { Routes, Route, Navigate } from 'react-router-dom';


import Menu from './pages/Menu';
import Admin from './pages/Admin';

const ProtectedRoute = ({ children }) => {
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/main" element={<Menu />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
