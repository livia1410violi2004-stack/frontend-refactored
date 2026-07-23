// Utilitários de exportação para CSV, XLSX e PDF.
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/** Faz download de um blob no navegador */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Exporta um array de objetos como CSV.
 * @param rows Array de objetos
 * @param filename ex.: "produtos.csv"
 * @param headers { [col]: label } — mapeamento coluna -> rótulo
 */
export function exportCSV(rows, filename, headers) {
  if (!rows || rows.length === 0) return;
  const cols = Object.keys(headers);
  const labels = Object.values(headers);
  const esc = (v) => {
    if (v === null || v === undefined) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",;\n]/.test(s) ? `"${s}"` : s;
  };
  const csvBody = rows.map((r) => cols.map((c) => esc(r[c])).join(";")).join("\n");
  const csv = "\ufeff" + labels.join(";") + "\n" + csvBody;
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), filename);
}

/** Exporta como XLSX real usando SheetJS. */
export function exportXLSX(rows, filename, headers, sheetName = "Dados") {
  if (!rows || rows.length === 0) return;
  const cols = Object.keys(headers);
  const labels = Object.values(headers);
  const aoa = [labels, ...rows.map((r) => cols.map((c) => r[c]))];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  // largura auto
  ws["!cols"] = labels.map((l, i) => ({
    wch: Math.max(l.length, ...aoa.slice(1).map((row) => String(row[i] ?? "").length)) + 2,
  }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  downloadBlob(new Blob([wbout], { type: "application/octet-stream" }), filename);
}

/** Exporta uma tabela genérica como PDF profissional (com header amarelo Absoluta). */
export function exportPDF(rows, filename, headers, title) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const cols = Object.keys(headers);
  const labels = Object.values(headers);

  // Header
  doc.setFillColor(29, 29, 28);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 22, "F");
  doc.setFillColor(242, 169, 0);
  doc.rect(0, 22, doc.internal.pageSize.getWidth(), 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("ABSOLUTA ERP · Fixadores", 12, 12);
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.setTextColor(242, 169, 0);
  doc.text(title || "Relatório", 12, 18);
  doc.setTextColor(200, 200, 200);
  doc.text(new Date().toLocaleString("pt-BR"), doc.internal.pageSize.getWidth() - 12, 18, { align: "right" });

  autoTable(doc, {
    startY: 30,
    head: [labels],
    body: rows.map((r) => cols.map((c) => (r[c] == null ? "" : String(r[c])))),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [29, 29, 28], textColor: [242, 169, 0], fontStyle: "bold", halign: "left" },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    theme: "grid",
    margin: { left: 8, right: 8 },
    didDrawPage: (data) => {
      const pageCount = doc.internal.getNumberOfPages();
      const page = data.pageNumber;
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        `Absoluta Fixadores · Fixando qualidade. Garantindo soluções.  ·  Página ${page} / ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 6,
        { align: "center" }
      );
    },
  });

  doc.save(filename);
}
