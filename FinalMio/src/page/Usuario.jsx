import { useEffect, useState } from "react";
import { getUsuarios } from "../api/getUsuarios.js";

export const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsuarios();
        setUsuarios(res);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="overflow-x-auto w-full max-w-4xl">
        <h1 className="text-4xl font-semibold text-center my-6 text-blue-600">Clientes</h1>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Email</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {usuarios.map((user, index) => (
              <tr key={index} className="hover:bg-blue-100">
                <td className="py-3 px-4">{user.nombre}</td>
                <td className="py-3 px-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
