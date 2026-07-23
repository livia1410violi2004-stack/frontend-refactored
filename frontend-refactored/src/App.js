import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { AppShell } from "./components/layout/AppShell";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import ClienteDetalhes from "./pages/ClienteDetalhes";
import ClienteForm from "./pages/ClienteForm";
import Produtos from "./pages/Produtos";
import ProdutoDetalhes from "./pages/ProdutoDetalhes";
import ProdutoForm from "./pages/ProdutoForm";
import ImportarProdutos from "./pages/ImportarProdutos";
import Orcamentos from "./pages/Orcamentos";
import NovoOrcamento from "./pages/NovoOrcamento";
import Pedidos from "./pages/Pedidos";
import Compras from "./pages/Compras";
import Estoque from "./pages/Estoque";
import Impostos from "./pages/Impostos";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Configuracoes from "./pages/Configuracoes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/novo" element={<ClienteForm />} />
              <Route path="/clientes/:id" element={<ClienteDetalhes />} />
              <Route path="/clientes/:id/editar" element={<ClienteForm />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/produtos/novo" element={<ProdutoForm />} />
              <Route path="/produtos/importar" element={<ImportarProdutos />} />
              <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
              <Route path="/produtos/:id/editar" element={<ProdutoForm />} />
              <Route path="/orcamentos" element={<Orcamentos />} />
              <Route path="/orcamentos/novo" element={<NovoOrcamento />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/compras" element={<Compras />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/impostos" element={<Impostos />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: 2,
              border: "1px solid #E5E7EB",
              fontFamily: "'Inter', sans-serif",
            },
          }}
        />
      </AuthProvider>
    </div>
  );
}

export default App;
