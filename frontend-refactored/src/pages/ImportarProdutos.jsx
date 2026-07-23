import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { Upload, FileSpreadsheet, CheckCircle2, AlertTriangle, X, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PRODUTOS } from "../constants/testIds";
import { ProdutosService } from "../services/produtos.service";

const PREVIEW_MOCK = [
  { codigo: "PAR-M12-50", referencia: "DIN933-M12x50", produto: "Parafuso Sextavado M12 x 50", categoria: "Parafusos", material: "Aço Carbono", medida: "M12 × 50 mm" },
  { codigo: "POR-M12-ZB", referencia: "DIN934-M12", produto: "Porca Sextavada M12 Zincada", categoria: "Porcas", material: "Aço Carbono", medida: "M12" },
  { codigo: "ARR-M12-PL", referencia: "DIN125-M12", produto: "Arruela Lisa M12", categoria: "Arruelas", material: "Aço Carbono", medida: "M12" },
  { codigo: "PAR-INOX-M6", referencia: "ISO4014-M6x20", produto: "Parafuso Inox M6 x 20", categoria: "Parafusos", material: "Inox 304", medida: "M6 × 20 mm" },
  { codigo: "REB-POP-3-8", referencia: "DIN7337-3x8", produto: "Rebite Pop 3 × 8", categoria: "Rebites", material: "Alumínio/Aço", medida: "3 × 8 mm" },
];

export default function ImportarProdutos() {
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleFile = (f) => {
    if (!f) return;
    const okExt = /\.(xlsx|csv)$/i.test(f.name);
    if (!okExt) return toast.error("Arquivo inválido. Envie um .xlsx ou .csv");
    setFile(f);
    toast.success(`Arquivo pronto: ${f.name}`);
  };

  const importar = async () => {
    if (!file) return toast.error("Selecione uma planilha primeiro.");
    setBusy(true);
    const res = await ProdutosService.importar(file);
    setBusy(false);
    toast.success(`Importação concluída · ${res.imported} produtos.`);
    navigate("/produtos");
  };

  return (
    <>
      <Header title="Importar produtos" subtitle="Upload de catálogo Excel / CSV" />
      <main data-testid={PRODUTOS.importPage} className="p-6 space-y-4 abs-fade-up">
        <button onClick={() => navigate(-1)} className="text-sm text-neutral-500 hover:text-[#1D1D1C] inline-flex items-center gap-1.5">
          <ArrowLeft size={14} /> Voltar
        </button>

        <PageHeader
          title="Importação de catálogo"
          description="Envie sua planilha de produtos (.xlsx ou .csv). Faça a pré-visualização e confirme a importação."
        />

        <div
          data-testid={PRODUTOS.importDrop}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
          className={`abs-card p-10 border-2 border-dashed transition-colors ${drag ? "border-[#F2A900] bg-yellow-50/50" : "border-neutral-300 bg-white"}`}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-[#1D1D1C] rounded-sm flex items-center justify-center mb-4">
              <Upload size={22} className="text-[#F2A900]" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-[#1D1D1C]">Arraste sua planilha aqui</h3>
            <p className="text-sm text-neutral-500 mt-1">Formatos aceitos: .xlsx e .csv · Tamanho máximo 10MB</p>
            <label className="mt-4 inline-block">
              <input
                data-testid={PRODUTOS.importFile}
                type="file"
                accept=".xlsx,.csv"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <span className="abs-btn-primary cursor-pointer"><FileSpreadsheet size={14} /> Selecionar arquivo</span>
            </label>
            {file && (
              <div className="mt-5 flex items-center gap-2 bg-neutral-100 rounded-sm px-3 py-1.5 text-xs">
                <FileSpreadsheet size={14} className="text-emerald-600" />
                <span className="font-mono">{file.name}</span>
                <button onClick={() => setFile(null)} className="text-neutral-500 hover:text-red-600">
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {file && (
          <>
            <div className="abs-card overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <div className="abs-panel-title">Pré-visualização</div>
                  <div className="text-xs text-neutral-500 mt-0.5">Exibindo 5 linhas da planilha (mock)</div>
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600"><CheckCircle2 size={14} /> 42 válidos</div>
                  <div className="flex items-center gap-1.5 text-amber-600"><AlertTriangle size={14} /> 3 duplicados</div>
                  <div className="flex items-center gap-1.5 text-red-600"><AlertTriangle size={14} /> 1 erro</div>
                </div>
              </div>
              <table className="w-full abs-table">
                <thead><tr><th>Código</th><th>Referência</th><th>Produto</th><th>Categoria</th><th>Material</th><th>Medida</th></tr></thead>
                <tbody>
                  {PREVIEW_MOCK.map((p) => (
                    <tr key={p.codigo}>
                      <td className="font-mono text-xs">{p.codigo}</td>
                      <td className="font-mono text-xs">{p.referencia}</td>
                      <td className="font-semibold">{p.produto}</td>
                      <td>{p.categoria}</td>
                      <td>{p.material}</td>
                      <td className="font-mono text-xs">{p.medida}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setFile(null)} className="abs-btn-ghost">Cancelar</button>
              <button
                data-testid={PRODUTOS.importConfirm}
                disabled={busy}
                onClick={importar}
                className="abs-btn-primary disabled:opacity-60"
              >
                <Upload size={14} /> {busy ? "Importando..." : "IMPORTAR PRODUTOS"}
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
