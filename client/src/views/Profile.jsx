import axios from 'axios';
import Context from '../contexts/Context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';

/**
 * Componente para mostrar el perfil del usuario autenticado.
 * 
 * @returns {JSX.Element} El componente de perfil.
 */
const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  /**
   * Obtiene los datos del desarrollador autenticado.
   * 
   * @returns {void}
   */
  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token');
    axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => setDeveloper(data.user))  // Modificación: Cambiado setDeveloper para usar data.user
      .catch(({ response: { data } }) => {
        console.error(data);
        window.sessionStorage.removeItem('token');
        setDeveloper(null);
        navigate('/');
      });
  };

  useEffect(getDeveloperData, []);

  return (
    <div className='py-5'>
      <h1>
        Bienvenido <span className='fw-bold'>{getDeveloper?.email}</span>
      </h1>
      <h3>
        {getDeveloper?.rol} en {getDeveloper?.lenguage}
      </h3>
    </div>
  );
};

export default Profile;
