import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [saldo, setSaldo] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaldo = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await api.get("/bill", config);
        const conta = response.data[0]; // Supondo que o usuário tenha apenas uma conta
        setSaldo(conta.saldo);
      } catch (err) {
        console.error("Erro ao buscar saldo:", err);
        logout();
        navigate("/");
      }
    };

    fetchSaldo();
  }, [logout, navigate]);

  const handleDeposito = async () => {
    const valor = parseFloat(prompt("Digite o valor do depósito:") || "0");
    if (valor <= 0) return;

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.patch("/bill", { id: "id_da_conta", valor }, config);
      setSaldo(saldo + valor);
    } catch (err) {
      console.error("Erro ao realizar depósito:", err);
    }
  };

  const handleSaque = async () => {
    const valor = parseFloat(prompt("Digite o valor do saque:") || "0");
    if (valor <= 0) return;

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.put("/bill", { id: "id_da_conta", valor }, config);
      setSaldo(saldo - valor);
    } catch (err) {
      console.error("Erro ao realizar saque:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user}!</h1>
      <h2 className="text-xl mb-6">Saldo: R$ {saldo.toFixed(2)}</h2>
      <div className="flex gap-4">
        <button onClick={handleDeposito} className="bg-green-500 text-white px-4 py-2 rounded">
          Depósito
        </button>
        <button onClick={handleSaque} className="bg-red-500 text-white px-4 py-2 rounded">
          Saque
        </button>
        <button onClick={logout} className="bg-gray-500 text-white px-4 py-2 rounded">
          Sair
        </button>
      </div>
    </div>
  );
}