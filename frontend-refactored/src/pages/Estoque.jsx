import React, { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { ProdutosService } from "../services/produtos.service";
import { mockMovimentacoes } from "../mocks/data";
import { ESTOQUE } from "../constants/testIds";
import { AlertTriangle, ArrowUpCircle, ArrowDownCircle, Package } from "lucide-react";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => { ProdutosService.list().then(setProdutos); }, []);

  const baixo = produtos.filter(p => p.estoque < p.estoqueMinimo);
  const totalItens = produtos.reduce((s, p) => s + p.estoque, 0);

  return (
    <>
      <Header title="Estoque" subtitle="Controle de entradas, saídas e saldo" />
      <main data-testid={ESTOQUE.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader title="Controle de Estoque" description="Visão consolidada do estoque de fixadores e movimentações recentes." />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="abs-card p-4">
            <div className="flex items-center gap-2 text-neutral-500"><Package size={14}/> <span className="abs-label">Total em estoque</span></div>
            <div className="font-mono text-2xl font-semibold mt-2">{totalItens.toLocaleString("pt-BR")}</div>
          </div>
          <div className="abs-card p-4">
            <div className="flex items-center gap-2 text-emerald-600"><ArrowUpCircle size={14}/> <span className="abs-label">Entradas (mês)</span></div>
            <div className="font-mono text-2xl font-semibold mt-2">42.800</div>
          </div>
          <div className="abs-card p-4">
            <div className="flex items-center gap-2 text-red-600"><ArrowDownCircle size={14}/> <span className="abs-label">Saídas (mês)</span></div>
            <div className="font-mono text-2xl font-semibold mt-2">38.140</div>
          </div>
          <div className="abs-card p-4 border-l-2 border-red-500">
            <div className="flex items-center gap-2 text-red-600"><AlertTriangle size={14}/> <span className="abs-label">Estoque baixo</span></div>
            <div className="font-mono text-2xl font-semibold mt-2">{baixo.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="abs-card">
            <div className="px-5 py-3 border-b border-neutral-200"><div className="abs-panel-title">Produtos com estoque baixo</div></div>
            <table className="w-full abs-table">
              <thead><tr><th>Produto</th><th className="text-right">Atual</th><th className="text-right">Mínimo</th></tr></thead>
              <tbody>
                {baixo.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="font-semibold">{p.nome}</div>
                      <div className="text-xs font-mono text-neutral-500">{p.codigoInterno}</div>
                    </td>
                    <td className="text-right font-mono text-red-600 font-semibold">{p.estoque.toLocaleString("pt-BR")}</td>
                    <td className="text-right font-mono text-neutral-500">{p.estoqueMinimo.toLocaleString("pt-BR")}</td>
                  </tr>
                ))}
                {baixo.length === 0 && <tr><td colSpan={3} className="text-center py-6 text-neutral-500 text-sm">Nenhum produto abaixo do mínimo.</td></tr>}
              </tbody>
            </table>
          </div>

          <div className="abs-card">
            <div className="px-5 py-3 border-b border-neutral-200"><div className="abs-panel-title">Movimentações recentes</div></div>
            <table className="w-full abs-table">
              <thead><tr><th>Data</th><th>Produto</th><th>Tipo</th><th className="text-right">Qtd</th><th>Doc</th></tr></thead>
              <tbody>
                {mockMovimentacoes.map(m => (
                  <tr key={m.id}>
                    <td className="font-mono text-xs text-neutral-500">{m.data}</td>
                    <td className="text-sm">{m.produto}</td>
                    <td><StatusBadge status={m.tipo} /></td>
                    <td className="text-right font-mono">{m.quantidade.toLocaleString("pt-BR")}</td>
                    <td className="font-mono text-xs">{m.doc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
