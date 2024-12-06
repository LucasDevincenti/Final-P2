import { Usuario } from "../models/Usuario.js"

export const getUsuario = async(req, res) => {
    const data = await Usuario.findAll();
    res.json(data)
}
export const getUsuarioId = async (req, res) => {
  const { id } = req.params;  // Obtiene el ID desde los parámetros de la URL

  try {
    // Buscamos el usuario por su ID
    const usuario = await Usuario.findByPk(id);  // findByPk es un método de Sequelize para buscar por clave primaria

    // Si el usuario no existe, respondemos con un error 404
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Si el usuario se encuentra, respondemos con los datos del usuario
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: "Error del servidor" });  // En caso de error en la consulta
  }
};

export const postUsuario = async (req, res) => {
  try {
      const { nombre, apellido, direccion, telefono, email, clave } = req.body;

      // Validar si el email ya está registrado
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
          return res.status(400).json({ error: 'El email ya está registrado' });
      }

      // Crear un nuevo usuario
      const newUsuario = await Usuario.create({
          nombre,
          apellido,
          direccion,
          telefono,
          email,
          clave, // Guardar la clave sin hashear
      });

      res.status(201).json(newUsuario);
  } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ error: 'Error del servidor. Inténtalo nuevamente.' });
  }
};
export const putUsuario = async (req, res) => {
  const { id } = req.params; // Obtén el ID del usuario desde los parámetros de la solicitud
  const { nombre, apellido, direccion, telefono } = req.body; // Incluye también dirección y teléfono

  try {
      // Encuentra el usuario por ID
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
          // Si no se encuentra el usuario, responde con un error 404
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // Actualiza los datos del usuario
      await usuario.update({
          nombre,
          apellido,
          direccion,
          telefono, // Actualiza también el teléfono
      });

      // Responde con el usuario actualizado
      res.json(usuario);
  } catch (error) {
      // Maneja errores
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
  }
};

