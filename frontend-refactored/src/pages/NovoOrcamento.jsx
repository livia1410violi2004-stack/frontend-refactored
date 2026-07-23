import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { toast } from "sonner";
import { ArrowLeft, Save, FileDown, Send, Plus, Trash2, Calculator } from "lucide-react";
import { ORC } from "../constants/testIds";
import { ClientesService } from "../services/clientes.service";
import { ProdutosService } from "../services/produtos.service";
import { RevestimentosService } from "../services/revestimentos.service";
import {
  transportadoras, tiposFrete, condicoesPagamento, mockUsuarios,
} from "../mocks/data";
import { calcularPrecoFinal, totaisOrcamento, fmtBRL, fmtNum, fmtPct } from "../utils/taxCalc";
import { gerarOrcamentoPDF } from "../utils/orcamentoPDF";

const Field = ({ label, children, className = "" }) => (
  <div className={className}>
    <label className="abs-label block mb-1.5">{label}</label>
    {children}
  </div>
);
const Input = (p) => (
  <input {...p} className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
);
const Select = (p) => (
  <select {...p} className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
);

// item fields: produtoId, codigo, descricao, revestimento, margemRevestimento,
// quantidade, precoVenda (unit), desconto, lucro, ipi, icms, peso, prazoEntrega
const EMPTY_ITEM = {
  produtoId: "", codigo: "", descricao: "", revestimento: "", margemRevestimento: 0,
  quantidade: 1, precoVenda: 0, desconto: 0, lucro: 0, ipi: 5, icms: 18, peso: 0,
  prazoEntrega: "5 dias úteis",
};

const nextNumero = () => "0" + Math.floor(147 + Math.random() * 500);

export default function NovoOrcamento() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [revs, setRevs] = useState([]);

  const [numero, setNumero] = useState(nextNumero());
  const [clienteId, setClienteId] = useState("");
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  const [validade, setValidade] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });
  const [vendedor, setVendedor] = useState("Camila Ferreira");
  const [condPagamento, setCondPagamento] = useState("30/60 dias");
  const [transportadora, setTransportadora] = useState("Braspress");
  const [tipoFrete, setTipoFrete] = useState("CIF (por conta do emitente)");
  const [valorFrete, setValorFrete] = useState(0);
  const [observacoes, setObservacoes] = useState("");
  const [itens, setItens] = useState([]);

  useEffect(() => {
    ClientesService.list().then(setClientes);
    ProdutosService.list().then(setProdutos);
    RevestimentosService.list().then(setRevs);
  }, []);

  const cliente = clientes.find(c => c.id === clienteId);

  const addItem = () => setItens([...itens, { ...EMPTY_ITEM }]);
  const remItem = (i) => setItens(itens.filter((_, idx) => idx !== i));
  const updItem = (i, key, val) => {
    setItens(prev => prev.map((it, idx) => {
      if (idx !== i) return it;
      const next = { ...it, [key]: val };
      // Auto-preenchimento ao trocar de produto
      if (key === "produtoId") {
        const p = produtos.find(x => x.id === val);
        if (p) {
          const revMargem = revs.find(r => r.nome === p.revestimento)?.margem || 0;
          Object.assign(next, {
            codigo: p.codigoInterno, descricao: p.nome,
            revestimento: p.revestimento, margemRevestimento: revMargem,
            precoVenda: p.precoVenda, desconto: p.desconto || 0, lucro: p.lucro || 0,
            ipi: p.ipi || 5, icms: p.icms || 18, peso: p.peso || 0,
          });
        }
      }
      if (key === "revestimento") {
        next.margemRevestimento = revs.find(r => r.nome === val)?.margem || 0;
      }
      return next;
    }));
  };

  const totais = useMemo(() => totaisOrcamento(itens, valorFrete), [itens, valorFrete]);

  const save = () => {
    if (!clienteId) return toast.error("Selecione um cliente.");
    if (itens.length === 0) return toast.error("Adicione pelo menos um produto.");
    toast.success(`Orçamento nº ${numero} salvo com sucesso.`);
    navigate("/orcamentos");
  };

  const gerarPDF = () => {
    if (!clienteId) return toast.error("Selecione um cliente para gerar o PDF.");
    if (itens.length === 0) return toast.error("Adicione produtos antes de gerar o PDF.");
    gerarOrcamentoPDF({
      numero, data, validade, vendedor, cliente, itens,
      transportadora, tipoFrete, condicaoPagamento: condPagamento,
      valorFrete, observacoes,
    });
    toast.success("PDF gerado com o layout Absoluta Fixadores.");
  };

  return (
    <>
      <Header title={`Novo Orçamento nº ${numero}`} subtitle="Criação de proposta comercial com cálculo fiscal automático" />
      <main className="p-6 space-y-4 abs-fade-up">
        <button onClick={() => navigate(-1)} className="text-sm text-neutral-500 hover:text-[#1D1D1C] inline-flex items-center gap-1.5">
          <ArrowLeft size={14} /> Voltar
        </button>

        <form data-testid={ORC.form} onSubmit={(e) => { e.preventDefault(); save(); }} className="space-y-4">
          {/* Header do orçamento */}
          <div className="abs-card p-5">
            <div className="abs-panel-title mb-4">Dados do Orçamento</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Field label="Número"><Input value={numero} onChange={(e)=>setNumero(e.target.value)} /></Field>
              <Field label="Data"><Input type="date" value={data} onChange={(e)=>setData(e.target.value)} /></Field>
              <Field label="Validade"><Input type="date" value={validade} onChange={(e)=>setValidade(e.target.value)} /></Field>
              <Field label="Vendedor responsável">
                <Select value={vendedor} onChange={(e)=>setVendedor(e.target.value)}>
                  {mockUsuarios.map(u=><option key={u.id}>{u.nome}</option>)}
                </Select>
              </Field>
              <Field label="Cliente" className="md:col-span-2">
                <Select
                  data-testid={ORC.selectCliente}
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  required
                >
                  <option value="">Selecione um cliente...</option>
                  {clientes.map(c => <option key={c.id} value={c.id}>{c.nomeFantasia} · {c.cnpj}</option>)}
                </Select>
              </Field>
              <Field label="Condição de pagamento">
                <Select value={condPagamento} onChange={(e)=>setCondPagamento(e.target.value)}>
                  {condicoesPagamento.map(x=><option key={x}>{x}</option>)}
                </Select>
              </Field>
              <Field label="Transportadora">
                <Select value={transportadora} onChange={(e)=>setTransportadora(e.target.value)}>
                  {transportadoras.map(x=><option key={x}>{x}</option>)}
                </Select>
              </Field>
              <Field label="Tipo de frete">
                <Select value={tipoFrete} onChange={(e)=>setTipoFrete(e.target.value)}>
                  {tiposFrete.map(x=><option key={x}>{x}</option>)}
                </Select>
              </Field>
              <Field label="Valor do frete (R$)"><Input type="number" step="0.01" value={valorFrete} onChange={(e)=>setValorFrete(Number(e.target.value))} /></Field>
            </div>

            {cliente && (
              <div className="mt-4 bg-neutral-50 border border-neutral-200 rounded-sm p-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div><div className="abs-label">CNPJ</div><div className="font-mono mt-0.5">{cliente.cnpj}</div></div>
                <div><div className="abs-label">Endereço</div><div className="mt-0.5">{cliente.rua}, {cliente.numero} · {cliente.cidade}/{cliente.estado}</div></div>
                <div><div className="abs-label">Contato</div><div className="mt-0.5">{cliente.contato} · {cliente.telefone}</div></div>
                <div><div className="abs-label">Segmento</div><div className="mt-0.5">{cliente.segmento}</div></div>
              </div>
            )}
          </div>

          {/* Itens */}
          <div className="abs-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
              <div>
                <div className="abs-panel-title">Itens do orçamento</div>
                <div className="text-xs text-neutral-500 mt-0.5">Cada item calcula automaticamente: preço + lucro + margem revestimento + IPI + ICMS.</div>
              </div>
              <button type="button" data-testid={ORC.addProduto} onClick={addItem} className="abs-btn-primary">
                <Plus size={14} /> Adicionar Produto
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full abs-table" style={{ minWidth: 1200 }}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Revestimento</th>
                    <th className="text-right">Qtd</th>
                    <th className="text-right">Valor Unit.</th>
                    <th className="text-right">Desc %</th>
                    <th className="text-right">Marg Rev.</th>
                    <th className="text-right">IPI %</th>
                    <th className="text-right">ICMS %</th>
                    <th className="text-right">Peso</th>
                    <th className="text-right">Total Item</th>
                    <th>Prazo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((it, i) => {
                    const r = calcularPrecoFinal(it);
                    return (
                      <tr key={i} data-testid={ORC.itemRow(i)}>
                        <td>
                          <Select value={it.produtoId} onChange={(e) => updItem(i, "produtoId", e.target.value)} className="!py-1 !text-xs">
                            <option value="">Selecione...</option>
                            {produtos.map(p => <option key={p.id} value={p.id}>{p.codigoInterno} — {p.nome}</option>)}
                          </Select>
                          {it.codigo && <div className="text-[10px] font-mono text-neutral-500 mt-1">NCM {produtos.find(p=>p.id===it.produtoId)?.ncm || "—"}</div>}
                        </td>
                        <td>
                          <Select value={it.revestimento} onChange={(e)=>updItem(i,"revestimento",e.target.value)} className="!py-1 !text-xs">
                            <option value="">—</option>
                            {revs.map(r => <option key={r.id} value={r.nome}>{r.nome} (+{r.margem}%)</option>)}
                          </Select>
                        </td>
                        <td className="text-right">
                          <Input type="number" min={1} value={it.quantidade} onChange={(e) => updItem(i, "quantidade", Number(e.target.value))} className="!w-20 !py-1 !text-xs !text-right font-mono" />
                        </td>
                        <td className="text-right">
                          <Input type="number" step="0.01" value={it.precoVenda} onChange={(e) => updItem(i, "precoVenda", Number(e.target.value))} className="!w-24 !py-1 !text-xs !text-right font-mono" />
                        </td>
                        <td className="text-right">
                          <Input type="number" min={0} max={100} value={it.desconto} onChange={(e) => updItem(i, "desconto", Number(e.target.value))} className="!w-16 !py-1 !text-xs !text-right font-mono" />
                        </td>
                        <td className="text-right font-mono text-xs text-[#F2A900] font-semibold">+{fmtPct(it.margemRevestimento)}</td>
                        <td className="text-right">
                          <Input type="number" step="0.01" value={it.ipi} onChange={(e) => updItem(i, "ipi", Number(e.target.value))} className="!w-16 !py-1 !text-xs !text-right font-mono" />
                        </td>
                        <td className="text-right">
                          <Input type="number" step="0.01" value={it.icms} onChange={(e) => updItem(i, "icms", Number(e.target.value))} className="!w-16 !py-1 !text-xs !text-right font-mono" />
                        </td>
                        <td className="text-right font-mono text-xs">{fmtNum(it.peso * it.quantidade, 3)}</td>
                        <td className="text-right font-mono font-semibold">{fmtBRL(r.totalItem)}</td>
                        <td>
                          <Input value={it.prazoEntrega} onChange={(e) => updItem(i, "prazoEntrega", e.target.value)} className="!w-28 !py-1 !text-xs" />
                        </td>
                        <td className="text-right">
                          <button type="button" onClick={() => remItem(i)} className="text-red-600 hover:bg-red-50 p-1.5 rounded-sm">
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {itens.length === 0 && (
                    <tr><td colSpan={12} className="text-center py-10 text-neutral-500 text-sm">Nenhum item adicionado. Clique em "Adicionar Produto".</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumo + observações */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
            <div className="abs-card p-5">
              <div className="abs-panel-title mb-3">Observações</div>
              <textarea rows={6} value={observacoes} onChange={e => setObservacoes(e.target.value)}
                placeholder="Condições comerciais, prazo de entrega, informações adicionais para o cliente..."
                className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
            </div>
            <div className="abs-card p-5 space-y-2 bg-[#1D1D1C] text-neutral-200 border-[#1D1D1C]">
              <div className="flex items-center gap-2">
                <Calculator size={14} className="text-[#F2A900]" />
                <div className="abs-label text-[#F2A900]">Resumo fiscal</div>
              </div>
              <div className="flex justify-between text-sm mt-3"><span className="text-neutral-400">Total dos Produtos</span><span className="font-mono">{fmtBRL(totais.totalProdutos)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-400">Total do IPI</span><span className="font-mono">{fmtBRL(totais.totalIpi)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-400">Total do ICMS</span><span className="font-mono">{fmtBRL(totais.totalIcms)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-400">Total ICMS-ST</span><span className="font-mono">{fmtBRL(totais.totalIcmsSt)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-400">Peso Total (kg)</span><span className="font-mono">{fmtNum(totais.pesoTotal, 3)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-neutral-400">Valor do Frete</span><span className="font-mono">{fmtBRL(totais.valorFrete)}</span></div>
              <div className="border-t border-neutral-700 pt-3 mt-1 flex justify-between items-baseline">
                <span className="abs-label text-[#F2A900]">Total Geral do Pedido</span>
                <span className="font-mono text-2xl font-semibold text-white">{fmtBRL(totais.totalGeral)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" data-testid={ORC.pdfBtn} onClick={gerarPDF} className="abs-btn-ghost"><FileDown size={14}/> Gerar PDF</button>
            <button type="button" data-testid={ORC.sendBtn} onClick={() => toast.success("Orçamento enviado ao cliente (simulado).")} className="abs-btn-ghost"><Send size={14}/> Enviar</button>
            <button type="submit" data-testid={ORC.saveBtn} className="abs-btn-primary"><Save size={14}/> Salvar</button>
          </div>
        </form>
      </main>
    </>
  );
}
