import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { Plus, Search, Eye, Pencil, Filter, Download } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CLIENTES } from "../constants/testIds";
import { ClientesService } from "../services/clientes.service";

export default function Clientes() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Todos");
  const navigate = useNavigate();

  useEffect(() => { ClientesService.list().then(setRows); }, []);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return rows.filter((r) => {
      if (status !== "Todos" && r.status !== status) return false;
      if (!t) return true;
      return [r.codigo, r.nomeFantasia, r.razaoSocial, r.cnpj, r.contato, r.cidade]
        .join(" ").toLowerCase().includes(t);
    });
  }, [rows, q, status]);

  return (
    <>
      <Header title="Clientes" subtitle={`${filtered.length} clientes encontrados`} />
      <main data-testid={CLIENTES.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader
          title="Clientes"
          description="Cadastro completo, histórico comercial e relacionamento com carteira B2B."
          actions={
            <>
              <button className="abs-btn-ghost"><Download size={14}/> Exportar</button>
              <button
                data-testid={CLIENTES.newBtn}
                onClick={() => navigate("/clientes/novo")}
                className="abs-btn-primary"
              >
                <Plus size={14}/> Novo Cliente
              </button>
            </>
          }
        />

        <div className="abs-card p-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-sm px-3 py-1.5 flex-1 min-w-[240px]">
            <Search size={14} className="text-neutral-400" />
            <input
              data-testid={CLIENTES.search}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por empresa, CNPJ, contato, cidade..."
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-neutral-500" />
            {["Todos", "Ativo", "Inativo"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm border transition-colors ${
                  status === s
                    ? "bg-[#1D1D1C] text-white border-[#1D1D1C]"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="abs-card overflow-x-auto">
          <table data-testid={CLIENTES.table} className="w-full abs-table">
            <thead>
              <tr>
                <th>Código</th><th>Empresa</th><th>CNPJ</th><th>Contato</th>
                <th>Telefone</th><th>Cidade / UF</th><th>Segmento</th>
                <th>Status</th><th className="text-right pr-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} data-testid={CLIENTES.row(c.id)}>
                  <td className="font-mono text-xs text-neutral-500">{c.codigo}</td>
                  <td>
                    <div className="font-semibold text-[#1D1D1C]">{c.nomeFantasia}</div>
                    <div className="text-xs text-neutral-500">{c.razaoSocial}</div>
                  </td>
                  <td className="font-mono text-xs">{c.cnpj}</td>
                  <td>{c.contato}</td>
                  <td className="font-mono text-xs">{c.telefone}</td>
                  <td>{c.cidade} <span className="text-neutral-400">/</span> {c.estado}</td>
                  <td>{c.segmento}</td>
                  <td><StatusBadge status={c.status} /></td>
                  <td className="text-right pr-4">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        data-testid={CLIENTES.viewBtn(c.id)}
                        to={`/clientes/${c.id}`}
                        className="p-1.5 hover:bg-neutral-100 rounded-sm text-neutral-700"
                        title="Visualizar"
                      >
                        <Eye size={15} />
                      </Link>
                      <button
                        data-testid={CLIENTES.editBtn(c.id)}
                        onClick={() => navigate(`/clientes/${c.id}/editar`)}
                        className="p-1.5 hover:bg-neutral-100 rounded-sm text-neutral-700"
                        title="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-sm text-neutral-500">
                    Nenhum cliente encontrado para os filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
