import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { toast } from "sonner";
import { PRODUTOS } from "../constants/testIds";
import { ProdutosService } from "../services/produtos.service";
import { RevestimentosService } from "../services/revestimentos.service";
import { ArrowLeft, Save, ImagePlus, Calculator } from "lucide-react";
import { OPCOES_ORIGEM, OPCOES_GRUPO, OPCOES_UNIDADE } from "../mocks/data";
import { calcularPrecoFinal, fmtBRL, fmtPct } from "../utils/taxCalc";

const Field = ({ label, children, className = "" }) => (
  <div className={className}>
    <label className="abs-label block mb-1.5">{label}</label>
    {children}
  </div>
);
const Input = (props) => (
  <input {...props} className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
);
const Select = (props) => (
  <select {...props} className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
);
const Section = ({ title, children, cols = 3 }) => (
  <div className="abs-card p-5">
    <div className="abs-panel-title mb-4">{title}</div>
    <div className={`grid grid-cols-1 gap-4 ${cols === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>{children}</div>
  </div>
);

const EMPTY = {
  codigoInterno: "", codigoFabricante: "", referencia: "", nome: "", descricao: "",
  categoria: "Parafusos", subcategoria: "", marca: "Absoluta", linha: "Standard",
  grupo: "Fixadores Standard",
  material: "Aço Carbono", acabamento: "", revestimento: "Zincado Branco", cor: "",
  norma: "DIN 933", ncm: "", procedencia: "0 - Nacional",
  diametro: "", comprimento: "", rosca: "Métrica", passo: "",
  peso: 0, unidade: "UN", embalagem: "", aplicacao: "", imagem: "",
  estoque: 0, estoqueMinimo: 0,
  precoCusto: 0, precoLista: 0, desconto: 0, lucro: 0, precoVenda: 0,
  ipi: 5, icms: 18,
};

export default function ProdutoForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [revestimentos, setRevestimentos] = useState([]);

  useEffect(() => {
    RevestimentosService.list().then(setRevestimentos);
    if (isEdit) ProdutosService.get(id).then((p) => p && setForm({ ...EMPTY, ...p }));
  }, [id, isEdit]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setNum = (k) => (e) => setForm((f) => ({ ...f, [k]: Number(e.target.value) || 0 }));

  const revSel = revestimentos.find(r => r.nome === form.revestimento);
  const preview = calcularPrecoFinal({
    precoVenda: form.precoVenda,
    margemProduto: form.lucro,
    margemRevestimento: revSel?.margem || 0,
    ipi: form.ipi,
    icms: form.icms,
    quantidade: 1,
    desconto: form.desconto,
  });

  const save = async (e) => {
    e.preventDefault();
    if (!form.codigoInterno || !form.nome) return toast.error("Preencha código e nome do produto.");
    if (isEdit) { await ProdutosService.update(id, form); toast.success("Produto atualizado."); }
    else { await ProdutosService.create(form); toast.success("Produto cadastrado."); }
    navigate("/produtos");
  };

  return (
    <>
      <Header title={isEdit ? "Editar Produto" : "Novo Produto"} subtitle="Cadastro técnico + fiscal do fixador" />
      <main className="p-6 space-y-4 abs-fade-up">
        <button onClick={() => navigate(-1)} className="text-sm text-neutral-500 hover:text-[#1D1D1C] inline-flex items-center gap-1.5">
          <ArrowLeft size={14} /> Voltar
        </button>

        <form data-testid={PRODUTOS.form} onSubmit={save} className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
          <div className="space-y-4">
            <Section title="Identificação">
              <Field label="Código interno"><Input value={form.codigoInterno} onChange={set("codigoInterno")} required /></Field>
              <Field label="Código fabricante"><Input value={form.codigoFabricante} onChange={set("codigoFabricante")} /></Field>
              <Field label="Referência"><Input value={form.referencia} onChange={set("referencia")} /></Field>
              <Field label="Descrição (Nome do produto)" className="md:col-span-2"><Input value={form.nome} onChange={set("nome")} required /></Field>
              <Field label="Categoria">
                <Select value={form.categoria} onChange={set("categoria")}>
                  {["Parafusos","Porcas","Arruelas","Rebites","Buchas","Pinos","Anéis","Prisioneiros"].map(c=><option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Subcategoria"><Input value={form.subcategoria} onChange={set("subcategoria")} /></Field>
              <Field label="Marca"><Input value={form.marca} onChange={set("marca")} /></Field>
              <Field label="Grupo">
                <Select value={form.grupo} onChange={set("grupo")}>
                  {OPCOES_GRUPO.map(c=><option key={c}>{c}</option>)}
                </Select>
              </Field>
              <Field label="Linha"><Input value={form.linha} onChange={set("linha")} /></Field>
              <Field label="Descrição detalhada" className="md:col-span-3">
                <textarea rows={2} value={form.descricao} onChange={set("descricao")} className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
              </Field>
            </Section>

            <Section title="Especificações técnicas">
              <Field label="Material"><Input value={form.material} onChange={set("material")} /></Field>
              <Field label="Revestimento">
                <Select value={form.revestimento} onChange={set("revestimento")}>
                  {revestimentos.map(r => <option key={r.id} value={r.nome}>{r.nome} (+{r.margem}%)</option>)}
                </Select>
              </Field>
              <Field label="Cor"><Input value={form.cor} onChange={set("cor")} /></Field>
              <Field label="Norma técnica"><Input value={form.norma} onChange={set("norma")} placeholder="DIN 933" /></Field>
              <Field label="NCM"><Input value={form.ncm} onChange={set("ncm")} placeholder="7318.15.00" /></Field>
              <Field label="Procedência">
                <Select value={form.procedencia} onChange={set("procedencia")}>
                  {OPCOES_ORIGEM.map(o=><option key={o}>{o}</option>)}
                </Select>
              </Field>
              <Field label="Diâmetro"><Input value={form.diametro} onChange={set("diametro")} placeholder="M8" /></Field>
              <Field label="Comprimento"><Input value={form.comprimento} onChange={set("comprimento")} placeholder="30 mm" /></Field>
              <Field label="Rosca"><Input value={form.rosca} onChange={set("rosca")} /></Field>
              <Field label="Passo"><Input value={form.passo} onChange={set("passo")} /></Field>
              <Field label="Peso (kg)"><Input type="number" step="0.001" value={form.peso} onChange={setNum("peso")} /></Field>
              <Field label="Unidade">
                <Select value={form.unidade} onChange={set("unidade")}>
                  {OPCOES_UNIDADE.map(u=><option key={u}>{u}</option>)}
                </Select>
              </Field>
              <Field label="Embalagem"><Input value={form.embalagem} onChange={set("embalagem")} /></Field>
              <Field label="Aplicação" className="md:col-span-3">
                <textarea rows={2} value={form.aplicacao} onChange={set("aplicacao")} className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
              </Field>
            </Section>

            <Section title="Comercial & Preços" cols={4}>
              <Field label="Preço custo (R$)"><Input type="number" step="0.01" value={form.precoCusto} onChange={setNum("precoCusto")} /></Field>
              <Field label="Preço de Lista (R$)"><Input type="number" step="0.01" value={form.precoLista} onChange={setNum("precoLista")} /></Field>
              <Field label="Desconto (%)"><Input type="number" step="0.01" value={form.desconto} onChange={setNum("desconto")} /></Field>
              <Field label="Lucro (%)"><Input type="number" step="0.01" value={form.lucro} onChange={setNum("lucro")} /></Field>
              <Field label="Preço de Venda (R$)"><Input type="number" step="0.01" value={form.precoVenda} onChange={setNum("precoVenda")} /></Field>
              <Field label="IPI (%)"><Input type="number" step="0.01" value={form.ipi} onChange={setNum("ipi")} /></Field>
              <Field label="ICMS (%)"><Input type="number" step="0.01" value={form.icms} onChange={setNum("icms")} /></Field>
              <Field label="Estoque atual"><Input type="number" value={form.estoque} onChange={setNum("estoque")} /></Field>
              <Field label="Estoque mínimo"><Input type="number" value={form.estoqueMinimo} onChange={setNum("estoqueMinimo")} /></Field>
            </Section>
          </div>

          <div className="space-y-4">
            <div className="abs-card p-5">
              <div className="abs-panel-title mb-4">Imagem</div>
              <div className="aspect-square border border-dashed border-neutral-300 rounded-sm flex items-center justify-center bg-neutral-50 overflow-hidden">
                {form.imagem ? (
                  <img src={form.imagem} alt="preview" className="w-full h-full object-cover"/>
                ) : (
                  <div className="text-center text-neutral-400">
                    <ImagePlus size={28} className="mx-auto" />
                    <div className="text-xs mt-2">Nenhuma imagem</div>
                  </div>
                )}
              </div>
              <Field label="URL da imagem" className="mt-4"><Input value={form.imagem} onChange={set("imagem")} placeholder="https://..." /></Field>
            </div>

            {/* Cálculo automático */}
            <div className="abs-card p-5 bg-[#1D1D1C] text-neutral-200 border-[#1D1D1C]">
              <div className="flex items-center gap-2">
                <Calculator size={14} className="text-[#F2A900]" />
                <div className="abs-label text-[#F2A900]">Simulador de preço</div>
              </div>
              <div className="mt-3 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between"><span className="text-neutral-400">Preço venda</span><span>{fmtBRL(form.precoVenda)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">+ Lucro produto</span><span>{fmtPct(form.lucro)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">+ Marg. revestimento</span><span>{fmtPct(revSel?.margem || 0)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">− Desconto</span><span>{fmtPct(form.desconto)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">+ IPI</span><span>{fmtPct(form.ipi)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-400">+ ICMS</span><span>{fmtPct(form.icms)}</span></div>
                <div className="border-t border-neutral-700 pt-2 mt-2 flex justify-between items-baseline">
                  <span className="abs-label text-[#F2A900]">Valor final</span>
                  <span className="font-mono text-2xl font-semibold text-white">{fmtBRL(preview.precoFinalUnit)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button type="submit" data-testid={PRODUTOS.saveBtn} className="abs-btn-primary justify-center">
                <Save size={14} /> Salvar Produto
              </button>
              <button type="button" onClick={() => navigate("/produtos")} className="abs-btn-ghost justify-center">Cancelar</button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
