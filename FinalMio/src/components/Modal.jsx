import React, { useState } from 'react';
import '../index.css';
import Axios from '../services/axios';

const Modal = ({ abierto, onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        email: '',
        clave: '',
        clave2: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos en el frontend
        if (!formData.nombre || !formData.apellido || !formData.email || !formData.clave || !formData.clave2) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        if (formData.clave !== formData.clave2) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        if (formData.clave.length < 8) {
            alert('La clave debe tener al menos 8 caracteres.');
            return;
        }

        try {
            const { nombre, apellido, direccion, telefono, email, clave } = formData; // Desestructuración de formData

            const response = await Axios.post('/usuario', {
                nombre,
                apellido,
                direccion,
                telefono,
                email,
                clave 
            });

            console.log('Usuario registrado:', response.data);
            alert('Usuario registrado con éxito');
            onClose(); // Cierra el modal tras éxito
        } catch (error) {
            console.error('Error registrando usuario:', error.response?.data || error.message);
            alert('Ocurrió un error al registrar el usuario. Intenta nuevamente.');
        }
    };

    if (!abierto) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nombre:
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </label>
                    <label>
                        Apellido:
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                    </label>
                    <label>
                        Dirección:
                        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
                    </label>
                    <label>
                        Teléfono:
                        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <label>
                        Clave:
                        <input type="password" name="clave" value={formData.clave} onChange={handleChange} />
                    </label>
                    <label>
                        Reescribir Clave:
                        <input type="password" name="clave2" value={formData.clave2} onChange={handleChange} />
                    </label>
                    <button type="submit">Registrarse</button>
                    <button type="button" onClick={onClose}>Cerrar</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
