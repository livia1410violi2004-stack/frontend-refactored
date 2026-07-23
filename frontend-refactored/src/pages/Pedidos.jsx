import React, { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { PedidosService } from "../services/pedidos.service";
import { PEDIDOS } from "../constants/testIds";

const fmt = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
const COLS = ["Aprovado", "Separação", "Produção", "Envio", "Finalizado"];

export default function Pedidos() {
  const [rows, setRows] = useState([]);
  useEffect(() => { PedidosService.list().then(setRows); }, []);

  return (
    <>
      <Header title="Pedidos" subtitle={`${rows.length} pedidos ativos`} />
      <main data-testid={PEDIDOS.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader title="Pipeline de Pedidos" description="Acompanhe o fluxo de produção e faturamento em tempo real." />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {COLS.map((col) => {
            const items = rows.filter(r => r.status === col);
            return (
              <div key={col} className="bg-white border border-neutral-200 rounded-sm flex flex-col">
                <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
                  <div className="abs-label">{col}</div>
                  <span className="font-mono text-xs font-semibold text-neutral-700">{items.length}</span>
                </div>
                <div className="p-3 space-y-2 min-h-[240px]">
                  {items.map(p => (
                    <div key={p.id} className="border border-neutral-200 rounded-sm p-3 hover:border-[#1D1D1C] transition-colors cursor-pointer">
                      <div className="font-mono text-[10px] text-neutral-500">{p.id}</div>
                      <div className="font-semibold text-sm text-[#1D1D1C] mt-1 line-clamp-1">{p.cliente}</div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-500">{p.itens} itens</span>
                        <span className="font-mono text-xs font-semibold">{fmt(p.valor)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="abs-card overflow-x-auto">
          <table className="w-full abs-table">
            <thead><tr><th>Número</th><th>Cliente</th><th>Data</th><th className="text-right">Itens</th><th className="text-right">Valor</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id}>
                  <td className="font-mono text-xs font-semibold">{p.id}</td>
                  <td>{p.cliente}</td>
                  <td className="font-mono text-xs">{p.data}</td>
                  <td className="text-right font-mono">{p.itens}</td>
                  <td className="text-right font-mono font-semibold">{fmt(p.valor)}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
