import React, { useEffect, useMemo, useRef, useState } from "react";
import { Plus, Pencil, Trash2, Search, Upload, Save, X } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "./ui/dialog";
import { ExportMenu } from "./ExportMenu";
import { exportCSV, exportXLSX, exportPDF } from "../utils/exporters";

/**
 * Tabela CRUD genérica para as tabelas fiscais.
 *
 * columns: [{
 *   key, label, type: 'text' | 'number' | 'select', options?, align?, suffix?, readOnly?, span?, hint?,
 * }]
 */
export const CRUDTable = ({
  title, description, columns, service, searchKeys = [], exportPrefix = "tabela",
  hideDelete = false, extraActions = null, exportTitle,
}) => {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [editingId, setEditingId] = useState(null);
  const fileRef = useRef(null);

  const refresh = () => service.list().then(setRows);
  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [service]);

  const filtered = useMemo(() => {
    if (!q) return rows;
    const t = q.toLowerCase();
    const keys = searchKeys.length ? searchKeys : columns.map((c) => c.key);
    return rows.filter((r) => keys.some((k) => String(r[k] ?? "").toLowerCase().includes(t)));
  }, [rows, q, searchKeys, columns]);

  const openNew = () => {
    const empty = columns.reduce((a, c) => ({ ...a, [c.key]: c.type === "number" ? 0 : "" }), {});
    setForm(empty); setEditingId(null); setOpen(true);
  };
  const openEdit = (r) => { setForm({ ...r }); setEditingId(r.id); setOpen(true); };

  const save = async () => {
    const missing = columns.filter((c) => c.required && (form[c.key] === "" || form[c.key] === null || form[c.key] === undefined));
    if (missing.length) return toast.error(`Preencha: ${missing.map((c) => c.label).join(", ")}`);
    if (editingId) { await service.update(editingId, form); toast.success("Registro atualizado."); }
    else { await service.create(form); toast.success("Registro criado."); }
    setOpen(false); refresh();
  };
  const remove = async (id) => {
    await service.remove(id); toast.success("Registro removido."); refresh();
  };

  const headersMap = useMemo(
    () => columns.reduce((a, c) => ({ ...a, [c.key]: c.label }), {}),
    [columns]
  );

  const doExport = (kind) => {
    if (filtered.length === 0) return toast.error("Nada para exportar.");
    const fname = `${exportPrefix}_${new Date().toISOString().slice(0, 10)}`;
    if (kind === "csv")  { exportCSV(filtered, `${fname}.csv`, headersMap);  toast.success("CSV exportado."); }
    if (kind === "xlsx") { exportXLSX(filtered, `${fname}.xlsx`, headersMap, exportPrefix); toast.success("Excel exportado."); }
    if (kind === "pdf")  { exportPDF(filtered, `${fname}.pdf`, headersMap, exportTitle || title); toast.success("PDF exportado."); }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      // Faz o de-para dos rótulos legíveis -> chaves internas
      const labelToKey = Object.fromEntries(columns.map((c) => [c.label, c.key]));
      const parsed = json.map((row) => {
        const out = {};
        Object.entries(row).forEach(([k, v]) => {
          const key = labelToKey[k] || k;
          out[key] = v;
        });
        return out;
      });
      const res = await service.bulkImport(parsed);
      toast.success(`${res.inserted} registros importados.`);
      refresh();
    } catch (err) {
      toast.error("Falha ao importar planilha.");
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const renderCell = (c, v) => {
    if (v === null || v === undefined || v === "") return <span className="text-neutral-400">—</span>;
    if (c.suffix) return <span className="font-mono">{v}{c.suffix}</span>;
    if (c.type === "number") return <span className="font-mono">{v}</span>;
    return String(v);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="abs-label">Tabela fiscal</div>
          <h2 className="font-heading text-xl font-bold text-[#1D1D1C] mt-0.5">{title}</h2>
          {description && <p className="text-sm text-neutral-500 mt-1 max-w-2xl">{description}</p>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {extraActions}
          <input ref={fileRef} type="file" accept=".xlsx,.csv" className="hidden" onChange={handleImport} />
          <button className="abs-btn-ghost" onClick={() => fileRef.current?.click()}>
            <Upload size={14}/> Importar
          </button>
          <ExportMenu
            onExportCSV={() => doExport("csv")}
            onExportXLSX={() => doExport("xlsx")}
            onExportPDF={() => doExport("pdf")}
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button onClick={openNew} className="abs-btn-primary">
                <Plus size={14}/> Adicionar
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-sm">
              <DialogHeader>
                <DialogTitle>{editingId ? "Editar" : "Novo"} — {title}</DialogTitle>
                <DialogDescription>Todos os campos configuráveis desta tabela fiscal do ABSOLUTA ERP.</DialogDescription>
              </DialogHeader>
              <form onSubmit={(e)=>{e.preventDefault();save();}} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {columns.map((c) => (
                  <div key={c.key} className={c.span === 2 ? "md:col-span-2" : ""}>
                    <label className="abs-label block mb-1.5">{c.label}{c.required && " *"}</label>
                    {c.type === "select" ? (
                      <select
                        className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]"
                        value={form[c.key] ?? ""}
                        onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                        disabled={c.readOnly}
                      >
                        <option value="">—</option>
                        {(c.options || []).map((o) => (
                          <option key={typeof o === "string" ? o : o.value} value={typeof o === "string" ? o : o.value}>
                            {typeof o === "string" ? o : o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={c.type === "number" ? "number" : "text"}
                        step={c.type === "number" ? (c.step || "0.01") : undefined}
                        value={form[c.key] ?? ""}
                        onChange={(e) => setForm({ ...form, [c.key]: c.type === "number" ? Number(e.target.value) : e.target.value })}
                        disabled={c.readOnly}
                        className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900] disabled:bg-neutral-50 disabled:text-neutral-500"
                        placeholder={c.hint}
                      />
                    )}
                  </div>
                ))}
                <DialogFooter className="md:col-span-2">
                  <button type="button" onClick={()=>setOpen(false)} className="abs-btn-ghost"><X size={14}/> Cancelar</button>
                  <button type="submit" className="abs-btn-primary"><Save size={14}/> Salvar</button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-sm px-3 py-1.5 max-w-md">
        <Search size={14} className="text-neutral-400" />
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar nesta tabela..." className="bg-transparent outline-none text-sm flex-1"/>
      </div>

      <div className="abs-card overflow-x-auto">
        <table className="w-full abs-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} style={{ textAlign: c.align || "left", width: c.width }}>{c.label}</th>
              ))}
              <th className="text-right pr-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                {columns.map((c) => (
                  <td key={c.key} style={{ textAlign: c.align || "left" }} className={c.mono ? "font-mono text-xs" : ""}>
                    {renderCell(c, r[c.key])}
                  </td>
                ))}
                <td className="text-right pr-4">
                  <div className="inline-flex gap-1">
                    <button onClick={()=>openEdit(r)} className="p-1.5 hover:bg-neutral-100 rounded-sm" title="Editar"><Pencil size={14}/></button>
                    {!hideDelete && (
                      <button onClick={()=>remove(r.id)} className="p-1.5 hover:bg-red-50 rounded-sm text-red-600" title="Excluir"><Trash2 size={14}/></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length+1} className="text-center py-10 text-sm text-neutral-500">Nenhum registro encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
