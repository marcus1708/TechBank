import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CadUserPage from "./pages/Cad_User";
import WelcomePage from "./pages/WelcomePage";
import Listar_User from "./pages/Listar_User";
import CreateAccountPage from "./pages/CreateAccountPage";
import ListAccountsPage from "./pages/ListAccountsPage";
import DepositWithdrawPage from "./pages/DepositWithdrawPage"; // Importação da nova tela

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<LoginPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<CadUserPage />} />
          <Route path="/usuarios" element={<Listar_User />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/list-accounts" element={<ListAccountsPage />} />
          <Route path="/deposit-withdraw/:id" element={<DepositWithdrawPage />} /> {/* Nova rota */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}