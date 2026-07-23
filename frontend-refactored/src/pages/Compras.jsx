import React, { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { ComprasService } from "../services/compras.service";
import { COMPRAS } from "../constants/testIds";
import { Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

const fmt = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export default function Compras() {
  const [rows, setRows] = useState([]);
  const [forn, setForn] = useState([]);

  useEffect(() => {
    ComprasService.list().then(setRows);
    ComprasService.fornecedores().then(setForn);
  }, []);

  return (
    <>
      <Header title="Compras" subtitle="Fornecedores, cotações e pedidos de compra" />
      <main data-testid={COMPRAS.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader
          title="Compras"
          description="Gestão de fornecedores, cotações e ordens de compra da Absoluta."
          actions={<button className="abs-btn-primary"><Plus size={14} /> Nova Cotação</button>}
        />

        <div className="abs-card">
          <Tabs defaultValue="pedidos">
            <TabsList className="w-full justify-start rounded-none bg-neutral-50 border-b border-neutral-200 h-auto p-0">
              <TabsTrigger value="pedidos" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3">Pedidos de Compra</TabsTrigger>
              <TabsTrigger value="fornecedores" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3">Fornecedores</TabsTrigger>
              <TabsTrigger value="cotacoes" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3">Cotações</TabsTrigger>
            </TabsList>

            <TabsContent value="pedidos" className="p-0">
              <table className="w-full abs-table">
                <thead><tr><th>Nº</th><th>Fornecedor</th><th>Produto</th><th className="text-right">Qtd</th><th className="text-right">Valor</th><th>Prazo</th><th>Status</th></tr></thead>
                <tbody>
                  {rows.map(c => (
                    <tr key={c.id}>
                      <td className="font-mono text-xs font-semibold">{c.id}</td>
                      <td>{c.fornecedor}</td>
                      <td>{c.produto}</td>
                      <td className="text-right font-mono">{c.quantidade.toLocaleString("pt-BR")}</td>
                      <td className="text-right font-mono font-semibold">{fmt(c.valor)}</td>
                      <td className="font-mono text-xs">{c.prazo}</td>
                      <td><StatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="fornecedores" className="p-0">
              <table className="w-full abs-table">
                <thead><tr><th>Código</th><th>Fornecedor</th><th>CNPJ</th><th>Contato</th><th>Telefone</th></tr></thead>
                <tbody>
                  {forn.map(f => (
                    <tr key={f.id}>
                      <td className="font-mono text-xs">{f.id}</td>
                      <td className="font-semibold">{f.nome}</td>
                      <td className="font-mono text-xs">{f.cnpj}</td>
                      <td>{f.contato}</td>
                      <td className="font-mono text-xs">{f.telefone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="cotacoes" className="p-6 text-sm text-neutral-500">
              Módulo de cotações em desenvolvimento. Estrutura pronta para integração via API.
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
