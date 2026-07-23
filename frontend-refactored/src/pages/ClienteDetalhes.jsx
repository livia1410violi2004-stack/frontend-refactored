import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { StatusBadge } from "../components/StatusBadge";
import { ClientesService } from "../services/clientes.service";
import { OrcamentosService } from "../services/orcamentos.service";
import { PedidosService } from "../services/pedidos.service";
import { ArrowLeft, Building2, Mail, Phone, MapPin, User, CreditCard, Pencil } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

const fmt = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export default function ClienteDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [c, setC] = useState(null);
  const [orc, setOrc] = useState([]);
  const [ped, setPed] = useState([]);

  useEffect(() => {
    ClientesService.get(id).then(setC);
    OrcamentosService.list().then((all) => setOrc(all.filter((o) => o.clienteId === id)));
    PedidosService.list().then(setPed);
  }, [id]);

  if (!c) return (
    <>
      <Header title="Cliente" />
      <main className="p-6"><div className="abs-card p-6 text-sm text-neutral-500">Carregando...</div></main>
    </>
  );

  const Info = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-sm bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0">
        <Icon size={15} />
      </div>
      <div className="min-w-0">
        <div className="abs-label">{label}</div>
        <div className="text-sm text-[#1D1D1C] font-medium mt-0.5 truncate">{value || "—"}</div>
      </div>
    </div>
  );

  return (
    <>
      <Header title={c.nomeFantasia} subtitle={c.razaoSocial} />
      <main className="p-6 space-y-4 abs-fade-up">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-sm text-neutral-500 hover:text-[#1D1D1C] inline-flex items-center gap-1.5">
            <ArrowLeft size={14} /> Voltar para clientes
          </button>
          <button onClick={() => navigate(`/clientes/${id}/editar`)} className="abs-btn-primary">
            <Pencil size={14} /> Editar Cliente
          </button>
        </div>

        <div className="abs-card p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="abs-label">Cliente · {c.codigo}</div>
              <h2 className="font-heading text-2xl font-bold text-[#1D1D1C] mt-1">{c.nomeFantasia}</h2>
              <div className="text-sm text-neutral-500">{c.razaoSocial}</div>
              <div className="flex items-center gap-3 mt-3">
                <StatusBadge status={c.status} />
                <span className="text-xs text-neutral-500 font-mono">CNPJ {c.cnpj}</span>
                <span className="text-xs text-neutral-500">· {c.segmento}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="abs-label">Limite crédito</div>
                <div className="font-mono text-lg font-semibold text-[#1D1D1C] mt-1">{fmt(c.limiteCredito)}</div>
              </div>
              <div>
                <div className="abs-label">Vendedor</div>
                <div className="text-sm font-semibold text-[#1D1D1C] mt-1">{c.vendedor}</div>
              </div>
              <div>
                <div className="abs-label">Condição pgto.</div>
                <div className="text-sm font-semibold text-[#1D1D1C] mt-1">{c.condicaoPagamento}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="abs-card p-5 space-y-4">
            <div className="abs-panel-title">Contato principal</div>
            <Info icon={User} label="Nome" value={`${c.contato} · ${c.cargo}`} />
            <Info icon={Phone} label="Telefone" value={c.telefone} />
            <Info icon={Phone} label="WhatsApp" value={c.whatsapp} />
            <Info icon={Mail} label="E-mail" value={c.email} />
          </div>
          <div className="abs-card p-5 space-y-4">
            <div className="abs-panel-title">Endereço</div>
            <Info icon={MapPin} label="Logradouro" value={`${c.rua}, ${c.numero} ${c.complemento ? `- ${c.complemento}` : ""}`} />
            <Info icon={Building2} label="Bairro" value={c.bairro} />
            <Info icon={MapPin} label="Cidade / UF" value={`${c.cidade} / ${c.estado}`} />
            <Info icon={CreditCard} label="CEP" value={c.cep} />
          </div>
          <div className="abs-card p-5 space-y-4">
            <div className="abs-panel-title">Observações comerciais</div>
            <p className="text-sm text-neutral-600 leading-relaxed">{c.observacoes || "Sem observações."}</p>
            <div className="pt-2 border-t border-neutral-100">
              <div className="abs-label">Cliente desde</div>
              <div className="font-mono text-sm text-[#1D1D1C] mt-1">{c.createdAt}</div>
            </div>
          </div>
        </div>

        <div className="abs-card">
          <Tabs defaultValue="orcamentos" className="w-full">
            <TabsList className="w-full justify-start rounded-none bg-neutral-50 border-b border-neutral-200 h-auto p-0">
              <TabsTrigger value="orcamentos" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3">Orçamentos ({orc.length})</TabsTrigger>
              <TabsTrigger value="pedidos" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3">Pedidos</TabsTrigger>
              <TabsTrigger value="historico" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3">Histórico</TabsTrigger>
            </TabsList>
            <TabsContent value="orcamentos" className="p-0">
              <table className="w-full abs-table">
                <thead><tr><th>Número</th><th>Data</th><th>Itens</th><th>Valor</th><th>Status</th></tr></thead>
                <tbody>
                  {orc.map((o) => (
                    <tr key={o.id}>
                      <td className="font-mono text-xs">{o.id}</td>
                      <td>{o.data}</td>
                      <td className="font-mono">{o.itens}</td>
                      <td className="font-mono font-semibold">{fmt(o.valor)}</td>
                      <td><StatusBadge status={o.status} /></td>
                    </tr>
                  ))}
                  {orc.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-neutral-500 text-sm">Nenhum orçamento para este cliente.</td></tr>}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="pedidos" className="p-6 text-sm text-neutral-500">Nenhum pedido vinculado no momento.</TabsContent>
            <TabsContent value="historico" className="p-6 text-sm text-neutral-500">Histórico de interações e alterações do cliente.</TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
