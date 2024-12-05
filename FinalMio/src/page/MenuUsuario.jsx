import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsuarioId } from '../api/getUsuarioId';  // Suponiendo que esta función existe
import { CircularProgress, Container, Typography, Paper, Grid, Button } from '@mui/material';

const MenuUsuario = () => {
  const { id } = useParams(); // Obtén el id desde la URL
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para la carga
  const navigate = useNavigate(); // Hook para la navegación

  // Efecto para obtener los datos del usuario cuando el componente se monte
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await getUsuarioId(id); // Llama a la función para obtener el usuario
        setUsuario(data); // Guarda el usuario en el estado
        setLoading(false); // Finaliza la carga
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setLoading(false); // Finaliza la carga en caso de error
      }
    };

    fetchUsuario();
  }, [id]); // El hook se vuelve a ejecutar si el id cambia

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Container>
    ); // Muestra el spinner mientras se carga
  }

  if (!usuario) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error">
          No se pudo encontrar el usuario.
        </Typography>
      </Container>
    ); // Muestra un mensaje de error si no se encuentra el usuario
  }

  const handleEdit = () => {
    // Redirige a una página de edición o habilita el modo de edición
    navigate(`/editarUsuario/${id}`); // Suponiendo que tienes una ruta de edición
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Detalles del Usuario
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Nombre:</Typography>
            <Typography variant="body1">{usuario.nombre}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Apellido:</Typography>
            <Typography variant="body1">{usuario.apellido}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Dirección:</Typography>
            <Typography variant="body1">{usuario.direccion}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Teléfono:</Typography>
            <Typography variant="body1">{usuario.telefono || 'No disponible'}</Typography>
          </Grid>
        </Grid>

        <Button 
          variant="contained" 
          color="primary" 
          sx={{ marginTop: 2 }}
          onClick={handleEdit} // Redirige a la página de edición
        >
          Editar Datos
        </Button>
      </Paper>
    </Container>
  );
};

export { MenuUsuario };
