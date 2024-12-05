import AxiosInstance from "../services/axios";

export const getUsuarios = async () => {
    try {
      const res = await AxiosInstance.get('/usuario');
      console.log(res.data); // Verifica la estructura de los datos
      return res.data;
    } catch (error) {
      console.error("Error para obtener los datos", error);
      throw error;
    }
  };
  