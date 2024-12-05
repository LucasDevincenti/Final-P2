import AxiosInstance from "../services/axios";

export const postUsuario = async (usuario) => {
  try {
    const res = await AxiosInstance.post('/usuario', usuario);
    console.log('Usuario creado:', res.data); // Muestra la respuesta del servidor
    return res.data; // Devuelve los datos si necesitas usarlos
  } catch (error) {
    console.error("Error al crear el usuario", error);
    throw error; // Lanza el error para que el componente lo maneje
  }
};

