import React from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { mockUsuarios } from "../mocks/data";
import { USUARIOS } from "../constants/testIds";
import { UserPlus, Shield } from "lucide-react";

export default function Usuarios() {
  return (
    <>
      <Header title="Usuários" subtitle="Controle de acesso e permissões" />
      <main data-testid={USUARIOS.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader
          title="Usuários & Permissões"
          description="Gerencie usuários internos, perfis e níveis de acesso ao sistema."
          actions={<button className="abs-btn-primary"><UserPlus size={14} /> Novo Usuário</button>}
        />

        <div className="abs-card overflow-x-auto">
          <table className="w-full abs-table">
            <thead>
              <tr><th>Usuário</th><th>E-mail</th><th>Perfil</th><th>Último acesso</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {mockUsuarios.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-[#1D1D1C] text-[#F2A900] flex items-center justify-center font-heading font-semibold text-xs">
                        {u.nome.split(" ").map(n => n[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <div className="font-semibold">{u.nome}</div>
                        <div className="text-xs text-neutral-500 font-mono">{u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-xs">{u.email}</td>
                  <td>
                    <div className="inline-flex items-center gap-1.5">
                      <Shield size={12} className="text-[#F2A900]" />
                      <span className="text-sm font-medium">{u.perfil}</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs">{u.ultimoAcesso}</td>
                  <td><StatusBadge status={u.ativo ? "Ativo" : "Inativo"} /></td>
                  <td className="text-right pr-4">
                    <button className="text-xs font-semibold hover:text-[#F2A900]">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Administrador", "Vendedor", "Estoque"].map(perfil => (
            <div key={perfil} className="abs-card p-5">
              <div className="abs-label">Perfil</div>
              <div className="abs-panel-title mt-1">{perfil}</div>
              <p className="text-sm text-neutral-500 mt-2">
                {perfil === "Administrador" ? "Acesso total ao sistema, gerência de usuários e configurações." :
                 perfil === "Vendedor" ? "Acesso a clientes, orçamentos e pedidos comerciais." :
                 "Acesso a produtos, estoque e movimentações."}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
