import React, { useState } from 'react';
import '../index.css';
import Axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ModalLogin = ({ abierto, onClose }) => {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await Axios.post('/login', { email, clave });
      console.log('Respuesta del servidor:', response.data);
  
      // Acceder al ID del usuario en la respuesta
      const userId = response.data.usuario.id; // <-- Verifica que `usuario.id` exista
      if (!userId) {
        throw new Error('ID del usuario no encontrado en la respuesta');
      }
  
      // Guardar el ID en localStorage
      localStorage.setItem('userId', userId);
  
  
      // Mostrar SweetAlert para el éxito
      Swal.fire({
        title: '¡Login Exitoso!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
  
      // Cerrar el modal
      onClose();
  
      // Redirigir a la página de usuarios después del login exitoso
      navigate('/menu');
    } catch (error) {
      setError('Email o clave incorrectos');
      console.error('Error durante el login:', error);
      
      // Mostrar SweetAlert para el error
      Swal.fire({
        title: 'Error',
        text: 'Email o clave incorrectos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  

  if (!abierto) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Clave:
            <input
              type="password"
              name="clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
