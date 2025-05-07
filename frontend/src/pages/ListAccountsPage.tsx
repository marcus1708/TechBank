import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import api from "../services/api";

export default function ListAccountsPage() {
  const [contas, setContas] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContas = async () => {
      try {
        const response = await api.get("/bill");
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setContas(response.data); // Define as contas apenas se houverem contas
        } else {
          setContas([]); // Define como vazio se não houver contas
        }
      } catch (err) {
        console.error("Erro ao carregar contas:", err); // Log do erro para depuração
        setError("Erro ao carregar contas. Tente novamente.");
      }
    };

    fetchContas();
  }, []);

  const handleExcluirConta = async (id: string) => {
    try {
      await api.delete(`/bill/${id}`);
      setContas(contas.filter((conta: any) => conta._id !== id)); // Remove a conta da lista localmente
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      setError("Erro ao excluir conta. Tente novamente.");
    }
  };

  const handleDepositarSacar = (id: string) => {
    window.location.href = `/deposit-withdraw/${id}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Contas</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {contas.length === 0 && !error ? (
          <p className="text-gray-600 text-center">Não há contas ativas.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Titular</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Saldo</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contas.map((conta: any) => (
                <tr key={conta._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{conta.titular}</td>
                  <td className="border border-gray-300 px-4 py-2">R$ {conta.saldo.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDepositarSacar(conta._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      Depositar/Sacar
                    </button>
                    <button
                      onClick={() => handleExcluirConta(conta._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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