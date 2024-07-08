import './App.css';
import Context from './contexts/Context';
import useDeveloper from './hooks/useDeveloper';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navigation from './components/Navigation';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Profile from './views/Profile';

/**
 * Componente para proteger rutas que requieren autenticación.
 * 
 * @param {Object} param0 - Los parámetros del componente.
 * @param {JSX.Element} param0.element - El componente protegido.
 * @returns {JSX.Element} El componente protegido o redirección a login.
 */
const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = window.sessionStorage.getItem('token');
  return token ? <Component {...rest} /> : <Navigate to="/login" />; // Modificación: Uso de Navigate para redirigir a login si no hay token
};

const App = () => {
  const globalState = useDeveloper();

  return (
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registrarse' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/perfil' element={<PrivateRoute element={Profile} />} /> {/* Modificación: Uso de PrivateRoute para proteger la ruta */}
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
