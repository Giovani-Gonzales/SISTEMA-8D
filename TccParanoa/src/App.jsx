import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import PrivateRoute from './pages/ProtectedRoute';
import Login from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Detalhes from './pages/Details'; // Importa o novo componente

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/detalhes/:id"
            element={
              <PrivateRoute>
                <Detalhes />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
