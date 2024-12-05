import AxiosInstance from "../services/axios";

export const getUsuarioId = async (usuarioId) => {
  try {
    const res = await AxiosInstance.get(`/usuario/${usuarioId}`);
    console.log('Usuario obtenido:', res.data); // Muestra la respuesta del servidor
    return res.data; // Devuelve los datos del usuario si los necesitas
  } catch (error) {
    console.error("Error al obtener el usuario", error);
    throw error; // Lanza el error para que el componente lo maneje
  }
};

