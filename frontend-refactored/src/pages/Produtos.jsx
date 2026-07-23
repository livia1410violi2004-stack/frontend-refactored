import React, { useEffect, useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { ExportMenu } from "../components/ExportMenu";
import { Plus, Search, Upload, LayoutGrid, List as ListIcon, Filter, AlertTriangle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { PRODUTOS } from "../constants/testIds";
import { ProdutosService } from "../services/produtos.service";
import { exportCSV, exportXLSX, exportPDF } from "../utils/exporters";
import { toast } from "sonner";

const fmtBRL = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const EXPORT_HEADERS = {
  codigoInterno: "Código",
  nome: "Descrição",
  precoVenda: "Preço Venda",
  peso: "Peso (kg)",
  ncm: "NCM",
  procedencia: "Procedência",
  grupo: "Grupo",
  precoLista: "Preço Lista",
  desconto: "Desconto %",
  lucro: "Lucro %",
  revestimento: "Revestimento",
  icms: "ICMS %",
  ipi: "IPI %",
  estoque: "Estoque",
  unidade: "Unidade",
};

export default function Produtos() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [view, setView] = useState("table");
  const [cat, setCat] = useState("Todas");
  const navigate = useNavigate();

  useEffect(() => { ProdutosService.list().then(setRows); }, []);

  const categorias = useMemo(() => ["Todas", ...Array.from(new Set(rows.map((p) => p.categoria)))], [rows]);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return rows.filter((p) => {
      if (cat !== "Todas" && p.categoria !== cat) return false;
      if (!t) return true;
      return [p.codigoInterno, p.codigoFabricante, p.referencia, p.nome, p.norma, p.diametro, p.comprimento, p.ncm, p.grupo]
        .join(" ").toLowerCase().includes(t);
    });
  }, [rows, q, cat]);

  const doExport = (kind) => {
    if (filtered.length === 0) return toast.error("Nada para exportar.");
    const fname = `produtos_absoluta_${new Date().toISOString().slice(0,10)}`;
    if (kind === "csv") { exportCSV(filtered, `${fname}.csv`, EXPORT_HEADERS); toast.success("CSV exportado."); }
    if (kind === "xlsx") { exportXLSX(filtered, `${fname}.xlsx`, EXPORT_HEADERS, "Produtos"); toast.success("Excel exportado."); }
    if (kind === "pdf") { exportPDF(filtered, `${fname}.pdf`, EXPORT_HEADERS, "Catálogo de Produtos · Absoluta Fixadores"); toast.success("PDF exportado."); }
  };

  return (
    <>
      <Header title="Produtos" subtitle={`${filtered.length} fixadores no catálogo`} />
      <main data-testid={PRODUTOS.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader
          title="Catálogo de Fixadores"
          description="Parafusos, porcas, arruelas, rebites, buchas e mais. Todo o portfólio industrial da Absoluta."
          actions={
            <>
              <button
                data-testid={PRODUTOS.importBtn}
                onClick={() => navigate("/produtos/importar")}
                className="abs-btn-ghost"
              ><Upload size={14}/> Importar Excel</button>
              <ExportMenu
                onExportCSV={() => doExport("csv")}
                onExportXLSX={() => doExport("xlsx")}
                onExportPDF={() => doExport("pdf")}
              />
              <button
                data-testid={PRODUTOS.newBtn}
                onClick={() => navigate("/produtos/novo")}
                className="abs-btn-primary"
              ><Plus size={14}/> Novo Produto</button>
            </>
          }
        />

        <div className="abs-card p-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-sm px-3 py-1.5 flex-1 min-w-[240px]">
            <Search size={14} className="text-neutral-400" />
            <input
              data-testid={PRODUTOS.search}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por código, referência, produto, NCM, grupo, norma, medida..."
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-neutral-500" />
            {categorias.map((s) => (
              <button
                key={s}
                onClick={() => setCat(s)}
                className={`text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm border transition-colors ${
                  cat === s
                    ? "bg-[#1D1D1C] text-white border-[#1D1D1C]"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300"
                }`}
              >{s}</button>
            ))}
          </div>
          <div data-testid={PRODUTOS.viewToggle} className="ml-auto inline-flex bg-neutral-100 p-0.5 rounded-sm">
            <button
              onClick={() => setView("table")}
              className={`p-1.5 rounded-sm ${view === "table" ? "bg-white shadow-sm" : "text-neutral-500"}`}
              title="Tabela"
            ><ListIcon size={15} /></button>
            <button
              onClick={() => setView("cards")}
              className={`p-1.5 rounded-sm ${view === "cards" ? "bg-white shadow-sm" : "text-neutral-500"}`}
              title="Catálogo"
            ><LayoutGrid size={15} /></button>
          </div>
        </div>

        {view === "table" ? (
          <div className="abs-card overflow-x-auto">
            <table data-testid={PRODUTOS.table} className="w-full abs-table">
              <thead>
                <tr>
                  <th>Código</th><th>Produto</th><th>NCM</th><th>Grupo</th>
                  <th>Revestimento</th><th>Norma</th>
                  <th className="text-right">Peso</th>
                  <th className="text-right">Estoque</th>
                  <th className="text-right">Preço</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const low = p.estoque < p.estoqueMinimo;
                  return (
                    <tr key={p.id} data-testid={PRODUTOS.row(p.id)}>
                      <td className="font-mono text-xs text-neutral-500">{p.codigoInterno}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <img src={p.imagem} alt={p.nome} className="w-9 h-9 rounded-sm object-cover border border-neutral-200"/>
                          <div>
                            <div className="font-semibold text-[#1D1D1C]">{p.nome}</div>
                            <div className="text-xs text-neutral-500 font-mono">{p.referencia}</div>
                          </div>
                        </div>
                      </td>
                      <td className="font-mono text-xs">{p.ncm}</td>
                      <td className="text-xs">{p.grupo}</td>
                      <td>
                        <span className="inline-flex items-center gap-1 text-xs bg-neutral-100 px-2 py-0.5 rounded-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F2A900]"/> {p.revestimento}
                        </span>
                      </td>
                      <td className="font-mono text-xs">{p.norma}</td>
                      <td className="text-right font-mono text-xs">{p.peso.toFixed(3)}</td>
                      <td className="text-right font-mono">
                        <span className={low ? "text-red-600 font-semibold" : ""}>{p.estoque.toLocaleString("pt-BR")}</span>
                        {low && <AlertTriangle size={12} className="inline ml-1 text-red-500" />}
                      </td>
                      <td className="text-right font-mono font-semibold">{fmtBRL(p.precoVenda)}</td>
                      <td className="text-right pr-4">
                        <Link to={`/produtos/${p.id}`} className="text-xs font-semibold text-[#1D1D1C] hover:text-[#F2A900]">Ver</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => {
              const low = p.estoque < p.estoqueMinimo;
              return (
                <div key={p.id} data-testid={PRODUTOS.card(p.id)} className="abs-card overflow-hidden group hover:border-[#1D1D1C] transition-colors">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50">
                    <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute top-2 left-2 bg-[#1D1D1C] text-[#F2A900] text-[10px] font-mono px-2 py-0.5 rounded-sm">{p.norma}</div>
                    {low && <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded-sm">Estoque baixo</div>}
                  </div>
                  <div className="p-4">
                    <div className="abs-label">{p.categoria} · NCM {p.ncm}</div>
                    <div className="font-heading font-semibold text-[#1D1D1C] mt-1 leading-tight">{p.nome}</div>
                    <div className="text-xs text-neutral-500 font-mono mt-0.5">{p.codigoInterno}</div>
                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F2A900]"/>
                      <span className="text-neutral-600">{p.revestimento}</span>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <div className="abs-label text-[10px]">Preço</div>
                        <div className="font-mono font-semibold text-[#1D1D1C]">{fmtBRL(p.precoVenda)}</div>
                      </div>
                      <Link to={`/produtos/${p.id}`} className="text-xs font-semibold text-[#1D1D1C] hover:text-[#F2A900]">Visualizar →</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
