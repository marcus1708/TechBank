import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); // Alterado de password para senha
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, senha); // Alterado de password para senha
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/welcome"); // Redireciona para a página de boas-vindas
      }, 2000);
    } catch {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      {showSuccessPopup && (
        <div className="absolute top-10 bg-green-500 text-white px-6 py-3 rounded shadow-md text-center z-50">
          Usuário logado com sucesso!
        </div>
      )}
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="senha" 
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-4 border rounded"
          value={senha} // Alterado de password para senha
          onChange={(e) => setSenha(e.target.value)} // Alterado de password para senha
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Entrar
        </button>
        <p className="text-sm mt-4 text-center">
          Não tem conta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
}