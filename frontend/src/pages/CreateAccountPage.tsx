import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function CreateAccountPage() {
  const [titular, setTitular] = useState("");
  const [saldo, setSaldo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/bill", { titular, saldo: parseFloat(saldo) });
      setSuccess("Conta criada com sucesso!");
      setTimeout(() => navigate("/list-accounts"), 2000); // Redireciona para listar contas
    } catch (err) {
      setError("Não é permitido criar conta com nome de usuário diferente do cadastrado !.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleCreateAccount} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Criar Conta</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="absolute top-10 bg-green-500 text-white px-6 py-3 rounded shadow-md text-center z-50">{success}</p>}
        <input
          type="text"
          placeholder="Titular"
          className="w-full p-2 mb-3 border rounded"
          value={titular}
          onChange={(e) => setTitular(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Saldo Inicial"
          className="w-full p-2 mb-4 border rounded"
          value={saldo}
          onChange={(e) => setSaldo(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Criar Conta
        </button>
      </form>
    </div>
  );
}