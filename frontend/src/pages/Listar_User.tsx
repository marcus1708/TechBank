import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import axios from "axios";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  profissao: string;
  idade: number;
}

export default function UserListPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsuarios(response.data);
      } catch (err) {
        setError("Erro ao carregar usuários. Tente novamente.");
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Usuários</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="bg-white p-4 rounded shadow-md text-center"
          >
            <h2 className="text-lg font-bold">{usuario.nome}</h2>
            <p>Email: {usuario.email}</p>
            <p>Profissão: {usuario.profissao}</p>
            <p>Idade: {usuario.idade}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/welcome")}
        className="mt-4 bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 w-24"
      >
        Voltar
      </button>
    </div>
  );
}