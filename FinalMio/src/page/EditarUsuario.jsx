import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsuarioId } from '../api/getUsuarioId'; // La función para obtener los datos del usuario
import { putUsuario } from '../api/putUsuario'; // La función para actualizar el usuario
import { CircularProgress, Container, TextField, Button, Typography, Paper } from '@mui/material';

const EditarUsuario = () => {
  const { id } = useParams(); // Obtén el id desde la URL
  const navigate = useNavigate(); // Hook para la navegación

  // Estado para manejar los datos del formulario
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '' // Agregado el campo teléfono
  });

  const [loading, setLoading] = useState(true); // Estado de carga
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para verificar si se está enviando la solicitud

  // Efecto para obtener los datos del usuario cuando el componente se monte
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await getUsuarioId(id); // Llama a la función para obtener el usuario
        setUsuario({
          nombre: data.nombre,
          apellido: data.apellido,
          direccion: data.direccion,
          telefono: data.telefono || '' // Incluye el teléfono, con un valor predeterminado vacío
        });
        setLoading(false); // Finaliza la carga
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setLoading(false); // Finaliza la carga en caso de error
      }
    };

    fetchUsuario();
  }, [id]); // El hook se vuelve a ejecutar si el id cambia

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    setIsSubmitting(true); // Cambia el estado de envío a verdadero

    try {
      const updatedUsuario = await putUsuario(id, usuario); // Llama a la función para actualizar el usuario
      console.log('Usuario actualizado:', updatedUsuario);
      navigate(`/menuUsuario/${id}`); // Redirige al usuario a la página de detalles después de la actualización
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    } finally {
      setIsSubmitting(false); // Finaliza el envío
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    ); // Muestra un spinner mientras se carga la información del usuario
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Editar Usuario
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
          />
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            margin="normal"
            name="direccion"
            value={usuario.direccion}
            onChange={handleChange}
          />
          <TextField
            label="Teléfono" // Campo agregado
            variant="outlined"
            fullWidth
            margin="normal"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            disabled={isSubmitting} // Deshabilita el botón mientras se está enviando la solicitud
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export { EditarUsuario };
