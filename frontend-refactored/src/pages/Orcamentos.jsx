import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { OrcamentosService } from "../services/orcamentos.service";
import { ORC } from "../constants/testIds";
import { Plus, Search, Filter, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExportMenu } from "../components/ExportMenu";
import { exportCSV, exportXLSX, exportPDF } from "../utils/exporters";
import { toast } from "sonner";

const fmt = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
const STATUS = ["Todos", "Aberto", "Enviado", "Negociação", "Aprovado", "Cancelado"];

export default function Orcamentos() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [st, setSt] = useState("Todos");
  const navigate = useNavigate();

  useEffect(() => { OrcamentosService.list().then(setRows); }, []);

  const filtered = useMemo(() => {
    return rows.filter((o) => {
      if (st !== "Todos" && o.status !== st) return false;
      if (!q) return true;
      return `${o.id} ${o.cliente} ${o.vendedor}`.toLowerCase().includes(q.toLowerCase());
    });
  }, [rows, q, st]);

  const totals = useMemo(() => ({
    total: filtered.reduce((s, o) => s + o.valor, 0),
    aprovados: filtered.filter(o => o.status === "Aprovado").length,
    pendentes: filtered.filter(o => ["Aberto","Enviado","Negociação"].includes(o.status)).length,
  }), [filtered]);

  return (
    <>
      <Header title="Orçamentos" subtitle={`${filtered.length} orçamentos · ${fmt(totals.total)}`} />
      <main data-testid={ORC.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader
          title="Orçamentos"
          description="Propostas comerciais, negociação e aprovação de vendas."
          actions={
            <>
              <ExportMenu
                onExportCSV={() => { exportCSV(filtered, "orcamentos.csv", { id:"Número", cliente:"Cliente", data:"Data", validade:"Validade", vendedor:"Vendedor", itens:"Itens", valor:"Valor", status:"Status", transportadora:"Transportadora", tipoFrete:"Frete", valorFrete:"Vlr Frete" }); toast.success("CSV exportado."); }}
                onExportXLSX={() => { exportXLSX(filtered, "orcamentos.xlsx", { id:"Número", cliente:"Cliente", data:"Data", validade:"Validade", vendedor:"Vendedor", itens:"Itens", valor:"Valor", status:"Status", transportadora:"Transportadora", tipoFrete:"Frete", valorFrete:"Vlr Frete" }, "Orcamentos"); toast.success("Excel exportado."); }}
                onExportPDF={() => { exportPDF(filtered, "orcamentos.pdf", { id:"Número", cliente:"Cliente", data:"Data", validade:"Validade", vendedor:"Vendedor", itens:"Itens", valor:"Valor", status:"Status" }, "Relatório de Orçamentos · Absoluta Fixadores"); toast.success("PDF exportado."); }}
              />
              <button data-testid={ORC.newBtn} onClick={() => navigate("/orcamentos/novo")} className="abs-btn-primary">
                <Plus size={14}/> Novo Orçamento
              </button>
            </>
          }
        />

        <div className="grid grid-cols-3 gap-4">
          <div className="abs-card p-4">
            <div className="abs-label">Aprovados</div>
            <div className="font-mono text-2xl font-semibold mt-1">{totals.aprovados}</div>
          </div>
          <div className="abs-card p-4">
            <div className="abs-label">Pendentes</div>
            <div className="font-mono text-2xl font-semibold mt-1">{totals.pendentes}</div>
          </div>
          <div className="abs-card p-4">
            <div className="abs-label">Valor total</div>
            <div className="font-mono text-2xl font-semibold mt-1">{fmt(totals.total)}</div>
          </div>
        </div>

        <div className="abs-card p-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-sm px-3 py-1.5 flex-1 min-w-[240px]">
            <Search size={14} className="text-neutral-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por cliente, número, vendedor..." className="bg-transparent outline-none text-sm flex-1"/>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-neutral-500" />
            {STATUS.map(s => (
              <button key={s} onClick={() => setSt(s)}
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm border ${st === s ? "bg-[#1D1D1C] text-white border-[#1D1D1C]" : "bg-white text-neutral-600 border-neutral-200"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="abs-card overflow-x-auto">
          <table className="w-full abs-table">
            <thead><tr><th>Número</th><th>Cliente</th><th>Data</th><th>Validade</th><th>Vendedor</th><th className="text-right">Itens</th><th className="text-right">Valor</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td className="font-mono text-xs font-semibold text-[#1D1D1C]">{o.id}</td>
                  <td>{o.cliente}</td>
                  <td className="font-mono text-xs">{o.data}</td>
                  <td className="font-mono text-xs text-neutral-500">{o.validade}</td>
                  <td>{o.vendedor}</td>
                  <td className="text-right font-mono">{o.itens}</td>
                  <td className="text-right font-mono font-semibold">{fmt(o.valor)}</td>
                  <td><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
