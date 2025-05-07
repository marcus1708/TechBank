import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function DepositWithdrawPage() {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da conta da URL
  const [valor, setValor] = useState("");
  const [saldoAtual, setSaldoAtual] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConta = async () => {
      try {
        const response = await api.get(`/bill/${id}`);
        setSaldoAtual(response.data.saldo); // Define o saldo atual da conta
      } catch (err) {
        console.error("Erro ao carregar conta:", err);
        setError("Erro ao carregar conta. Tente novamente.");
      }
    };

    fetchConta();
  }, [id]);

  const handleDeposito = async () => {
    try {
      const response = await api.patch(`/bill/deposito/${id}`, {
        valor: parseFloat(valor),
      });
      setSaldoAtual(response.data.saldo); // Atualiza o saldo atual
      setSuccess("Depósito realizado com sucesso!");
      setError(""); // Limpa mensagens de erro
      setValor(""); // Limpa o campo de valor
  
      // Aguarda 2 segundos para exibir a mensagem e recarrega a página
      setTimeout(() => {
        window.location.reload(); // Recarrega a página
      }, 200); // Tempo ajustado para 0,5 segundos
    } catch (err) {
      console.error("Erro ao realizar depósito:", err);
      setError("Erro ao realizar depósito. Tente novamente!");
      setSuccess(""); // Limpa mensagens de sucesso
    }
  };

  const handleSaque = async () => {
    try {
      const response = await api.put(`/bill/saque/${id}`, {
        valor: parseFloat(valor),
      });
      setSaldoAtual(response.data.saldo); // Atualiza o saldo atual
      setSuccess("Saque realizado com sucesso !");
      setValor(""); // Limpa o campo de valor
  
      // Aguarda 1 segundo para exibir a mensagem e recarrega a página
      setTimeout(() => {
        window.location.reload(); // Recarrega a página
      }, 200); // Tempo ajustado para 0,5 segundos
    } catch (err) {
      console.error("Erro ao realizar saque:", err);
      setError("Erro ao realizar saque. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Depósito/Saque</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="absolute top-10 bg-green-500 text-white px-6 py-3 rounded shadow-md text-center z-50">{success}</p>}
        {saldoAtual !== null && (
          <p className="text-gray-700 text-center mb-4">
            Saldo Atual: <span className="font-bold">R$ {saldoAtual.toFixed(2)}</span>
          </p>
        )}
        <input
          id="valor"
          type="number"
          placeholder="Valor"
          className="w-full p-2 mb-4 border rounded"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
        />
        <div className="flex justify-between">
          <button
            onClick={handleDeposito}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-1/2 mr-2"
          >
            Depósito
          </button>
          <button
            onClick={handleSaque}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-1/2"
          >
            Saque
          </button>
        </div>
        <button
          onClick={() => navigate("/list-accounts")}
          className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}