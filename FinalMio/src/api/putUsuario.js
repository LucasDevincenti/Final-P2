import AxiosInstance from "../services/axios";

export const putUsuario = async (usuarioId, usuario) => {
  try {
    const res = await AxiosInstance.put(`/usuario/${usuarioId}`, usuario);
    console.log('Usuario actualizado:', res.data); // Muestra la respuesta del servidor
    return res.data; // Devuelve los datos si necesitas usarlos
  } catch (error) {
    console.error("Error al actualizar el usuario", error);
    throw error; // Lanza el error para que el componente lo maneje
  }
};
