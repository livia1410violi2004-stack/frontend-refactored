import React from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { SalesChart } from "../components/charts/SalesChart";
import { ProductsChart } from "../components/charts/ProductsChart";
import { CustomersChart } from "../components/charts/CustomersChart";
import { QuotesChart } from "../components/charts/QuotesChart";
import { Users, Package, FileText, ClipboardList, ShoppingCart, TrendingUp, Download, Plus } from "lucide-react";
import { DASH } from "../constants/testIds";
import { mockAtividades, brand } from "../mocks/data";
import { useNavigate } from "react-router-dom";

const dot = { yellow: "#F2A900", green: "#10B981", gray: "#6B7280" };

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Header title="Dashboard" subtitle="Visão geral · Absoluta Fixadores" />
      <main data-testid={DASH.root} className="p-6 space-y-6 abs-fade-up">
        <PageHeader
          title="Painel Executivo"
          description="Indicadores em tempo real da operação comercial e industrial da Absoluta."
          actions={
            <>
              <button className="abs-btn-ghost"><Download size={14} /> Exportar</button>
              <button className="abs-btn-primary" onClick={() => navigate("/orcamentos")}>
                <Plus size={14} /> Novo Orçamento
              </button>
            </>
          }
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4">
          <StatCard testid={DASH.kpi("clientes")} label="Clientes ativos" value="428" delta={4.2} icon={Users} />
          <StatCard testid={DASH.kpi("produtos")} label="Produtos cadastrados" value="2.184" delta={1.8} icon={Package} />
          <StatCard testid={DASH.kpi("orcamentos")} label="Orçamentos pendentes" value="47" delta={-2.1} icon={FileText} accent />
          <StatCard testid={DASH.kpi("pedidos")} label="Pedidos em andamento" value="19" delta={12.5} icon={ClipboardList} />
          <StatCard testid={DASH.kpi("compras")} label="Compras pendentes" value="8" delta={0.5} icon={ShoppingCart} />
          <StatCard testid={DASH.kpi("vendas-mes")} label="Vendas no mês" value="R$ 312.780" delta={8.4} icon={TrendingUp} accent />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div data-testid={DASH.salesChart} className="abs-card p-5 lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="abs-label">Comercial</div>
                <div className="abs-panel-title">Vendas por mês</div>
              </div>
              <div className="text-xs text-neutral-500">Últimos 6 meses</div>
            </div>
            <SalesChart />
          </div>
          <div data-testid={DASH.customersChart} className="abs-card p-5">
            <div className="mb-4">
              <div className="abs-label">Carteira</div>
              <div className="abs-panel-title">Clientes por segmento</div>
            </div>
            <CustomersChart />
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div data-testid={DASH.productsChart} className="abs-card p-5 lg:col-span-2">
            <div className="mb-4">
              <div className="abs-label">Portfólio</div>
              <div className="abs-panel-title">Produtos mais vendidos</div>
            </div>
            <ProductsChart />
          </div>
          <div data-testid={DASH.quotesChart} className="abs-card p-5">
            <div className="mb-4">
              <div className="abs-label">Pipeline</div>
              <div className="abs-panel-title">Evolução comercial</div>
            </div>
            <QuotesChart />
          </div>
        </div>

        {/* Activities + banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div data-testid={DASH.activityFeed} className="abs-card p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="abs-label">Auditoria</div>
                <div className="abs-panel-title">Últimas atividades</div>
              </div>
              <button className="text-xs text-neutral-500 hover:text-[#1D1D1C] font-semibold">Ver todas</button>
            </div>
            <ul className="divide-y divide-neutral-100">
              {mockAtividades.map((a) => (
                <li key={a.id} className="py-3 flex items-start gap-3">
                  <span
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ background: dot[a.cor] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[#1D1D1C]">{a.texto}</div>
                    <div className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider mt-0.5">
                      {a.tempo} · {a.tipo}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="abs-card overflow-hidden relative">
            <img src={brand.factory} alt="Indústria" className="w-full h-40 object-cover" />
            <div className="p-5">
              <div className="abs-label text-[#F2A900]">Absoluta Fixadores</div>
              <div className="abs-panel-title mt-1">Precisão em cada peça.</div>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                Portfólio com mais de 2.000 referências em fixadores industriais para as principais indústrias do país.
              </p>
              <button className="abs-btn-ghost mt-4">Ver catálogo</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
