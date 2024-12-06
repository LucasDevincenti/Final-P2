import { Usuario } from '../models/Usuario.js';

export const login = async (req, res) => {
    const { email, clave } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (usuario.clave !== clave) {
            return res.status(401).json({ message: 'Clave incorrecta' });
        }

        return res.json({ message: 'Login exitoso', usuario });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error });

    }
};