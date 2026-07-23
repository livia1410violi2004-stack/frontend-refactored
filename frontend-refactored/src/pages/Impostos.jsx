import React, { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "../components/ui/dialog";
import { Plus, Pencil, Trash2, Landmark, Layers, Percent, Save, X } from "lucide-react";
import { toast } from "sonner";
import { IMPOSTOS } from "../constants/testIds";
import { ImpostosService } from "../services/impostos.service";
import { RevestimentosService } from "../services/revestimentos.service";
import {
  OPCOES_APLICA_A, OPCOES_CST, OPCOES_CFOP_SAIDA, OPCOES_ORIGEM,
} from "../mocks/data";
import { fmtPct } from "../utils/taxCalc";

const Field = ({ label, children, span = 1 }) => (
  <div className={span === 2 ? "md:col-span-2" : ""}>
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

const EMPTY_REGRA = {
  nome: "", aplicaA: "Categoria", target: "",
  icms: 18, ipi: 5, icmsSt: 0, pis: 1.65, cofins: 7.6,
  ncm: "", cfop: "5102", cst: "000", origem: "0 - Nacional", ativo: true,
};
const EMPTY_REV = { nome: "", margem: 0, descricao: "" };

export default function Impostos() {
  const [regras, setRegras] = useState([]);
  const [revs, setRevs] = useState([]);
  const [regraOpen, setRegraOpen] = useState(false);
  const [revOpen, setRevOpen] = useState(false);
  const [regra, setRegra] = useState(EMPTY_REGRA);
  const [rev, setRev] = useState(EMPTY_REV);
  const [editingRegraId, setEditingRegraId] = useState(null);
  const [editingRevId, setEditingRevId] = useState(null);

  const refresh = () => {
    ImpostosService.list().then(setRegras);
    RevestimentosService.list().then(setRevs);
  };
  useEffect(() => { refresh(); }, []);

  const openNewRegra = () => { setRegra(EMPTY_REGRA); setEditingRegraId(null); setRegraOpen(true); };
  const openEditRegra = (r) => { setRegra({ ...r }); setEditingRegraId(r.id); setRegraOpen(true); };
  const saveRegra = async () => {
    if (!regra.nome || !regra.target) return toast.error("Preencha nome e destino da regra.");
    if (editingRegraId) { await ImpostosService.update(editingRegraId, regra); toast.success("Regra fiscal atualizada."); }
    else { await ImpostosService.create(regra); toast.success("Regra fiscal criada."); }
    setRegraOpen(false); refresh();
  };
  const removeRegra = async (id) => {
    await ImpostosService.remove(id); toast.success("Regra removida."); refresh();
  };

  const openNewRev = () => { setRev(EMPTY_REV); setEditingRevId(null); setRevOpen(true); };
  const openEditRev = (r) => { setRev({ ...r }); setEditingRevId(r.id); setRevOpen(true); };
  const saveRev = async () => {
    if (!rev.nome) return toast.error("Informe o nome do revestimento.");
    if (editingRevId) { await RevestimentosService.update(editingRevId, rev); toast.success("Revestimento atualizado."); }
    else { await RevestimentosService.create(rev); toast.success("Revestimento criado."); }
    setRevOpen(false); refresh();
  };
  const removeRev = async (id) => {
    await RevestimentosService.remove(id); toast.success("Revestimento removido."); refresh();
  };

  return (
    <>
      <Header title="Impostos" subtitle="Regras fiscais, alíquotas e revestimentos" />
      <main data-testid={IMPOSTOS.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader
          title="Impostos & Revestimentos"
          description="Configure alíquotas ICMS, IPI, PIS, COFINS, NCM, CFOP, CST por produto, categoria, cliente ou grupo — e margens por revestimento."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="abs-card p-4">
            <div className="abs-label flex items-center gap-1"><Landmark size={12}/> Regras fiscais</div>
            <div className="font-mono text-2xl font-semibold mt-2">{regras.length}</div>
          </div>
          <div className="abs-card p-4">
            <div className="abs-label flex items-center gap-1"><Layers size={12}/> Revestimentos</div>
            <div className="font-mono text-2xl font-semibold mt-2">{revs.length}</div>
          </div>
          <div className="abs-card p-4">
            <div className="abs-label flex items-center gap-1"><Percent size={12}/> ICMS Padrão</div>
            <div className="font-mono text-2xl font-semibold mt-2">18,00%</div>
          </div>
          <div className="abs-card p-4">
            <div className="abs-label flex items-center gap-1"><Percent size={12}/> IPI médio</div>
            <div className="font-mono text-2xl font-semibold mt-2">
              {regras.length ? fmtPct(regras.reduce((s,r)=>s+r.ipi,0)/regras.length) : "0%"}
            </div>
          </div>
        </div>

        <div className="abs-card">
          <Tabs defaultValue="regras">
            <TabsList className="w-full justify-start rounded-none bg-neutral-50 border-b border-neutral-200 h-auto p-0">
              <TabsTrigger data-testid={IMPOSTOS.tabRegras} value="regras"
                className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3">
                <Landmark size={14} className="mr-2" /> Regras Fiscais
              </TabsTrigger>
              <TabsTrigger data-testid={IMPOSTOS.tabRevestimentos} value="revest"
                className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3">
                <Layers size={14} className="mr-2" /> Revestimentos & Margens
              </TabsTrigger>
            </TabsList>

            {/* REGRAS FISCAIS */}
            <TabsContent value="regras" className="p-0">
              <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <div className="text-xs text-neutral-500">
                  Cada regra pode ser aplicada a: <b>Produto</b>, <b>Categoria</b>, <b>Cliente</b> ou <b>Grupo</b>.
                </div>
                <Dialog open={regraOpen} onOpenChange={setRegraOpen}>
                  <DialogTrigger asChild>
                    <button data-testid={IMPOSTOS.newRegraBtn} onClick={openNewRegra} className="abs-btn-primary">
                      <Plus size={14} /> Nova Regra Fiscal
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl rounded-sm">
                    <DialogHeader>
                      <DialogTitle>{editingRegraId ? "Editar" : "Nova"} regra fiscal</DialogTitle>
                      <DialogDescription>Configure alíquotas (ICMS, IPI, ICMS-ST, PIS, COFINS) e códigos fiscais (NCM, CFOP, CST, origem) aplicáveis a um produto, categoria, cliente ou grupo.</DialogDescription>
                    </DialogHeader>
                    <form data-testid={IMPOSTOS.regraForm} onSubmit={(e)=>{e.preventDefault();saveRegra();}} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Nome da regra" span={2}>
                        <Input value={regra.nome} onChange={e=>setRegra({...regra,nome:e.target.value})} required />
                      </Field>
                      <Field label="Aplica-se a">
                        <Select value={regra.aplicaA} onChange={e=>setRegra({...regra,aplicaA:e.target.value})}>
                          {OPCOES_APLICA_A.map(x=><option key={x}>{x}</option>)}
                        </Select>
                      </Field>
                      <Field label={`Alvo (${regra.aplicaA})`}>
                        <Input value={regra.target} onChange={e=>setRegra({...regra,target:e.target.value})} placeholder="Ex.: Parafusos, CLI-001, Inox Premium..." required />
                      </Field>
                      <Field label="ICMS (%)"><Input type="number" step="0.01" value={regra.icms} onChange={e=>setRegra({...regra,icms:Number(e.target.value)})} /></Field>
                      <Field label="IPI (%)"><Input type="number" step="0.01" value={regra.ipi} onChange={e=>setRegra({...regra,ipi:Number(e.target.value)})} /></Field>
                      <Field label="ICMS-ST (%)"><Input type="number" step="0.01" value={regra.icmsSt} onChange={e=>setRegra({...regra,icmsSt:Number(e.target.value)})} /></Field>
                      <Field label="PIS (%)"><Input type="number" step="0.01" value={regra.pis} onChange={e=>setRegra({...regra,pis:Number(e.target.value)})} /></Field>
                      <Field label="COFINS (%)"><Input type="number" step="0.01" value={regra.cofins} onChange={e=>setRegra({...regra,cofins:Number(e.target.value)})} /></Field>
                      <Field label="NCM"><Input value={regra.ncm} onChange={e=>setRegra({...regra,ncm:e.target.value})} placeholder="0000.00.00" /></Field>
                      <Field label="CFOP">
                        <Select value={regra.cfop} onChange={e=>setRegra({...regra,cfop:e.target.value})}>
                          {OPCOES_CFOP_SAIDA.map(x=><option key={x}>{x}</option>)}
                        </Select>
                      </Field>
                      <Field label="CST">
                        <Select value={regra.cst} onChange={e=>setRegra({...regra,cst:e.target.value})}>
                          {OPCOES_CST.map(x=><option key={x}>{x}</option>)}
                        </Select>
                      </Field>
                      <Field label="Origem da mercadoria" span={2}>
                        <Select value={regra.origem} onChange={e=>setRegra({...regra,origem:e.target.value})}>
                          {OPCOES_ORIGEM.map(x=><option key={x}>{x}</option>)}
                        </Select>
                      </Field>
                      <DialogFooter className="md:col-span-2">
                        <button type="button" onClick={()=>setRegraOpen(false)} className="abs-btn-ghost"><X size={14}/> Cancelar</button>
                        <button type="submit" data-testid={IMPOSTOS.regraSaveBtn} className="abs-btn-primary"><Save size={14}/> Salvar regra</button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full abs-table">
                  <thead><tr>
                    <th>Nome</th><th>Aplica-se</th><th>Alvo</th>
                    <th className="text-right">ICMS</th><th className="text-right">IPI</th><th className="text-right">ICMS-ST</th>
                    <th className="text-right">PIS</th><th className="text-right">COFINS</th>
                    <th>NCM</th><th>CFOP</th><th>CST</th><th></th>
                  </tr></thead>
                  <tbody>
                    {regras.map(r => (
                      <tr key={r.id} data-testid={IMPOSTOS.regraRow(r.id)}>
                        <td className="font-semibold">{r.nome}</td>
                        <td><span className="text-[10px] font-semibold uppercase bg-neutral-100 px-2 py-0.5 rounded-sm">{r.aplicaA}</span></td>
                        <td className="text-sm">{r.target}</td>
                        <td className="text-right font-mono">{fmtPct(r.icms)}</td>
                        <td className="text-right font-mono">{fmtPct(r.ipi)}</td>
                        <td className="text-right font-mono">{fmtPct(r.icmsSt)}</td>
                        <td className="text-right font-mono text-neutral-500">{fmtPct(r.pis)}</td>
                        <td className="text-right font-mono text-neutral-500">{fmtPct(r.cofins)}</td>
                        <td className="font-mono text-xs">{r.ncm}</td>
                        <td className="font-mono text-xs">{r.cfop}</td>
                        <td className="font-mono text-xs">{r.cst}</td>
                        <td className="text-right pr-4">
                          <div className="inline-flex gap-1">
                            <button onClick={()=>openEditRegra(r)} className="p-1.5 hover:bg-neutral-100 rounded-sm"><Pencil size={14}/></button>
                            <button onClick={()=>removeRegra(r.id)} className="p-1.5 hover:bg-red-50 rounded-sm text-red-600"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {regras.length===0 && <tr><td colSpan={12} className="text-center py-10 text-neutral-500 text-sm">Nenhuma regra fiscal cadastrada.</td></tr>}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* REVESTIMENTOS */}
            <TabsContent value="revest" className="p-0">
              <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                <div className="text-xs text-neutral-500">
                  Cada revestimento possui sua própria <b>margem (%)</b>, aplicada no cálculo do preço final.
                </div>
                <Dialog open={revOpen} onOpenChange={setRevOpen}>
                  <DialogTrigger asChild>
                    <button data-testid={IMPOSTOS.newRevestBtn} onClick={openNewRev} className="abs-btn-primary">
                      <Plus size={14} /> Novo Revestimento
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md rounded-sm">
                    <DialogHeader>
                      <DialogTitle>{editingRevId ? "Editar" : "Novo"} revestimento</DialogTitle>
                      <DialogDescription>Cada revestimento possui sua própria margem (%), aplicada automaticamente no cálculo do preço final do produto.</DialogDescription>
                    </DialogHeader>
                    <form data-testid={IMPOSTOS.revestForm} onSubmit={(e)=>{e.preventDefault();saveRev();}} className="grid grid-cols-2 gap-4">
                      <Field label="Nome" span={2}><Input value={rev.nome} onChange={e=>setRev({...rev,nome:e.target.value})} required /></Field>
                      <Field label="Margem (%)"><Input type="number" step="0.01" value={rev.margem} onChange={e=>setRev({...rev,margem:Number(e.target.value)})} /></Field>
                      <Field label="Ativo"><Select value={rev.ativo===false?"não":"sim"} onChange={e=>setRev({...rev,ativo:e.target.value==="sim"})}><option>sim</option><option>não</option></Select></Field>
                      <Field label="Descrição" span={2}><Input value={rev.descricao} onChange={e=>setRev({...rev,descricao:e.target.value})} /></Field>
                      <DialogFooter className="col-span-2">
                        <button type="button" onClick={()=>setRevOpen(false)} className="abs-btn-ghost"><X size={14}/> Cancelar</button>
                        <button type="submit" data-testid={IMPOSTOS.revestSaveBtn} className="abs-btn-primary"><Save size={14}/> Salvar</button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full abs-table">
                  <thead><tr><th>Nome</th><th>Descrição</th><th className="text-right">Margem</th><th></th></tr></thead>
                  <tbody>
                    {revs.map(r => (
                      <tr key={r.id} data-testid={IMPOSTOS.revestRow(r.id)}>
                        <td className="font-semibold">{r.nome}</td>
                        <td className="text-sm text-neutral-500">{r.descricao || "—"}</td>
                        <td className="text-right font-mono font-semibold text-[#F2A900]">+{fmtPct(r.margem)}</td>
                        <td className="text-right pr-4">
                          <div className="inline-flex gap-1">
                            <button onClick={()=>openEditRev(r)} className="p-1.5 hover:bg-neutral-100 rounded-sm"><Pencil size={14}/></button>
                            <button onClick={()=>removeRev(r.id)} className="p-1.5 hover:bg-red-50 rounded-sm text-red-600"><Trash2 size={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {revs.length===0 && <tr><td colSpan={4} className="text-center py-10 text-neutral-500 text-sm">Nenhum revestimento cadastrado.</td></tr>}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="abs-card p-5 bg-neutral-50 border-dashed">
          <div className="abs-label">Fórmula de cálculo</div>
          <div className="mt-2 font-mono text-sm text-[#1D1D1C]">
            Preço Venda + Margem do Produto + Margem do Revestimento + IPI + ICMS = <span className="text-[#F2A900] font-semibold">VALOR FINAL</span>
          </div>
          <div className="text-xs text-neutral-500 mt-2">
            A aplicação é feita como acréscimos sucessivos: <code>base × (1 + lucro%) × (1 + margem_rev%) × (1 − desconto%) × (1 + IPI%) × (1 + ICMS%)</code>.
          </div>
        </div>
      </main>
    </>
  );
}
