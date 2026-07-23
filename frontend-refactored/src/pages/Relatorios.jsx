import React, { useState } from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { SalesChart } from "../components/charts/SalesChart";
import { ProductsChart } from "../components/charts/ProductsChart";
import { CustomersChart } from "../components/charts/CustomersChart";
import { QuotesChart } from "../components/charts/QuotesChart";
import { RELATORIOS } from "../constants/testIds";
import { FileText, Download, Filter } from "lucide-react";

const REPORTS = [
  { key: "vendas", nome: "Relatório de Vendas", desc: "Faturamento, ticket médio e vendedores." },
  { key: "clientes", nome: "Relatório de Clientes", desc: "Segmentação e desempenho da carteira." },
  { key: "produtos", nome: "Relatório de Produtos", desc: "Giro, margem e mix de produtos." },
  { key: "orcamentos", nome: "Relatório de Orçamentos", desc: "Taxa de conversão e pipeline." },
  { key: "estoque", nome: "Relatório de Estoque", desc: "Saldo, cobertura e alertas." },
];

export default function Relatorios() {
  const [sel, setSel] = useState("vendas");

  return (
    <>
      <Header title="Relatórios" subtitle="Análises comerciais e operacionais" />
      <main data-testid={RELATORIOS.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader
          title="Central de Relatórios"
          description="Gere relatórios gerenciais com filtros por período, cliente, produto e categoria."
          actions={<button className="abs-btn-primary"><Download size={14} /> Exportar PDF</button>}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
          <div className="abs-card p-4 space-y-1">
            <div className="abs-label mb-3 px-1">Relatórios disponíveis</div>
            {REPORTS.map(r => (
              <button
                key={r.key}
                onClick={() => setSel(r.key)}
                className={`w-full text-left p-3 rounded-sm border transition-colors ${sel === r.key ? "bg-[#1D1D1C] border-[#1D1D1C] text-white" : "bg-white border-neutral-200 hover:border-neutral-300"}`}
              >
                <div className={`text-sm font-semibold ${sel === r.key ? "text-[#F2A900]" : "text-[#1D1D1C]"}`}>{r.nome}</div>
                <div className={`text-xs mt-0.5 ${sel === r.key ? "text-neutral-300" : "text-neutral-500"}`}>{r.desc}</div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="abs-card p-4 flex flex-wrap items-center gap-3">
              <Filter size={14} className="text-neutral-500" />
              <div className="flex items-center gap-2">
                <label className="text-xs text-neutral-500">De:</label>
                <input type="date" className="bg-white border border-neutral-300 rounded-sm px-2 py-1.5 text-xs" />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-neutral-500">Até:</label>
                <input type="date" className="bg-white border border-neutral-300 rounded-sm px-2 py-1.5 text-xs" />
              </div>
              <select className="bg-white border border-neutral-300 rounded-sm px-2 py-1.5 text-xs">
                <option>Todos os clientes</option>
                <option>Metalúrgica Vega Ltda.</option>
                <option>InoxPar Indústria S/A</option>
              </select>
              <select className="bg-white border border-neutral-300 rounded-sm px-2 py-1.5 text-xs">
                <option>Todos os produtos</option>
                <option>Parafusos</option>
                <option>Porcas</option>
                <option>Arruelas</option>
              </select>
              <button className="abs-btn-ghost ml-auto"><FileText size={14}/> Gerar</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="abs-card p-5">
                <div className="abs-panel-title mb-3">Vendas por mês</div>
                <SalesChart />
              </div>
              <div className="abs-card p-5">
                <div className="abs-panel-title mb-3">Top produtos</div>
                <ProductsChart />
              </div>
              <div className="abs-card p-5">
                <div className="abs-panel-title mb-3">Clientes por segmento</div>
                <CustomersChart />
              </div>
              <div className="abs-card p-5">
                <div className="abs-panel-title mb-3">Orçamentos vs. aprovações</div>
                <QuotesChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
