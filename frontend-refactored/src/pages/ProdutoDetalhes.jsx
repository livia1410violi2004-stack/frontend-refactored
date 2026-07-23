import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { ProdutosService } from "../services/produtos.service";
import { ArrowLeft, Pencil, Package } from "lucide-react";

const fmtBRL = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const Row = ({ k, v }) => (
  <div className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
    <span className="abs-label">{k}</span>
    <span className="text-sm text-[#1D1D1C] font-medium">{v || "—"}</span>
  </div>
);

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setP] = useState(null);
  useEffect(() => { ProdutosService.get(id).then(setP); }, [id]);

  if (!p) return (<><Header title="Produto"/><main className="p-6"><div className="abs-card p-6 text-sm">Carregando...</div></main></>);

  return (
    <>
      <Header title={p.nome} subtitle={p.codigoInterno} />
      <main className="p-6 space-y-4 abs-fade-up">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-sm text-neutral-500 hover:text-[#1D1D1C] inline-flex items-center gap-1.5">
            <ArrowLeft size={14} /> Voltar
          </button>
          <button onClick={() => navigate(`/produtos/${id}/editar`)} className="abs-btn-primary">
            <Pencil size={14} /> Editar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4">
          <div className="abs-card overflow-hidden">
            <img src={p.imagem} alt={p.nome} className="w-full aspect-square object-cover"/>
            <div className="p-5">
              <div className="abs-label">{p.categoria} · {p.marca}</div>
              <h2 className="font-heading text-xl font-bold mt-1">{p.nome}</h2>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{p.descricao}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-semibold">{fmtBRL(p.precoVenda)}</span>
                <span className="text-xs text-neutral-500">/ {p.unidade}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="abs-card p-5">
              <div className="abs-panel-title mb-3">Especificações técnicas & fiscais</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <Row k="Referência" v={p.referencia} />
                <Row k="Código fabricante" v={p.codigoFabricante} />
                <Row k="NCM" v={p.ncm} />
                <Row k="Procedência" v={p.procedencia} />
                <Row k="Grupo" v={p.grupo} />
                <Row k="Norma" v={p.norma} />
                <Row k="Material" v={p.material} />
                <Row k="Revestimento" v={p.revestimento} />
                <Row k="Cor" v={p.cor} />
                <Row k="Diâmetro" v={p.diametro} />
                <Row k="Comprimento" v={p.comprimento} />
                <Row k="Rosca / Passo" v={`${p.rosca} · ${p.passo}`} />
                <Row k="Peso" v={`${p.peso} kg`} />
                <Row k="Embalagem" v={p.embalagem} />
                <Row k="Unidade" v={p.unidade} />
                <Row k="Estoque mínimo" v={p.estoqueMinimo?.toLocaleString("pt-BR")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="abs-card p-5">
                <div className="abs-label">Estoque atual</div>
                <div className="font-mono text-2xl font-semibold mt-1">{p.estoque.toLocaleString("pt-BR")}</div>
                <div className="text-xs text-neutral-500 mt-1">Mínimo: {p.estoqueMinimo.toLocaleString("pt-BR")}</div>
              </div>
              <div className="abs-card p-5">
                <div className="abs-label">Custo · Margem</div>
                <div className="font-mono text-2xl font-semibold mt-1">{fmtBRL(p.precoCusto)}</div>
                <div className="text-xs text-emerald-600 mt-1 font-semibold">
                  +{Math.round(((p.precoVenda - p.precoCusto) / p.precoCusto) * 100)}% de margem
                </div>
              </div>
            </div>
            <div className="abs-card p-5">
              <div className="abs-panel-title mb-3">Comercial & Impostos</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><div className="abs-label">Preço Lista</div><div className="font-mono font-semibold mt-1">{fmtBRL(p.precoLista || 0)}</div></div>
                <div><div className="abs-label">Preço Venda</div><div className="font-mono font-semibold mt-1">{fmtBRL(p.precoVenda)}</div></div>
                <div><div className="abs-label">Desconto</div><div className="font-mono font-semibold mt-1">{(p.desconto||0).toFixed(2)}%</div></div>
                <div><div className="abs-label">Lucro</div><div className="font-mono font-semibold mt-1">{(p.lucro||0).toFixed(2)}%</div></div>
                <div><div className="abs-label">IPI</div><div className="font-mono font-semibold mt-1 text-[#F2A900]">{(p.ipi||0).toFixed(2)}%</div></div>
                <div><div className="abs-label">ICMS</div><div className="font-mono font-semibold mt-1 text-[#F2A900]">{(p.icms||0).toFixed(2)}%</div></div>
              </div>
            </div>
            <div className="abs-card p-5">
              <div className="abs-panel-title mb-2">Aplicação</div>
              <p className="text-sm text-neutral-600 leading-relaxed">{p.aplicacao}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
