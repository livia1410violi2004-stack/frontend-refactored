// PDF profissional de Orçamento — layout ABSOLUTA FIXADORES
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { empresa } from "../mocks/data";
import { calcularPrecoFinal, totaisOrcamento, fmtBRL, fmtNum, fmtPct } from "./taxCalc";

const BLACK = [29, 29, 28];
const YELLOW = [242, 169, 0];
const GRAY = [110, 110, 110];
const LIGHT = [245, 245, 245];

/** Desenha o logo Absoluta ("A" com hex-nut) via vetores no PDF. */
function drawLogo(doc, x, y, size = 14) {
  const s = size;
  doc.setFillColor(...BLACK);
  // left beam
  doc.triangle(x + s * 0.05, y + s * 0.95, x + s * 0.45, y + s * 0.30, x + s * 0.35, y + s * 0.95, "F");
  // right beam
  doc.triangle(x + s * 0.55, y + s * 0.30, x + s * 0.95, y + s * 0.95, x + s * 0.65, y + s * 0.95, "F");
  // yellow accent
  doc.setFillColor(...YELLOW);
  doc.triangle(x + s * 0.72, y + s * 0.30, x + s * 0.95, y + s * 0.95, x + s * 0.82, y + s * 0.95, "F");
  // hex nut
  doc.setFillColor(...BLACK);
  const cx = x + s / 2, cy = y + s * 0.65, r = s * 0.14;
  doc.circle(cx, cy, r, "F");
  doc.setFillColor(255, 255, 255);
  doc.circle(cx, cy, r * 0.35, "F");
}

export function gerarOrcamentoPDF({
  numero, data, validade, vendedor,
  cliente, itens, transportadora, tipoFrete, condicaoPagamento,
  valorFrete = 0, observacoes = "",
}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  let y = 10;

  // ==== Header ====
  doc.setFillColor(...BLACK);
  doc.rect(0, 0, W, 28, "F");
  doc.setFillColor(...YELLOW);
  doc.rect(0, 28, W, 2, "F");
  drawLogo(doc, 10, 6, 18);
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold").setFontSize(15);
  doc.text("ABSOLUTA FIXADORES", 32, 13);
  doc.setFont(undefined, "normal").setFontSize(8);
  doc.setTextColor(...YELLOW);
  doc.text("FIXANDO QUALIDADE. GARANTINDO SOLUÇÕES.", 32, 18);
  doc.setTextColor(220, 220, 220);
  doc.setFontSize(7);
  doc.text(`${empresa.razaoSocial} · CNPJ ${empresa.cnpj}`, 32, 22);
  doc.text(`${empresa.endereco} · ${empresa.cidade} · ${empresa.telefone}`, 32, 25.5);

  // Título/número
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined, "bold").setFontSize(11);
  doc.text("ORÇAMENTO", W - 12, 12, { align: "right" });
  doc.setTextColor(...YELLOW);
  doc.setFontSize(18);
  doc.text(`Nº ${numero || "—"}`, W - 12, 20, { align: "right" });
  doc.setTextColor(220, 220, 220);
  doc.setFont(undefined, "normal").setFontSize(8);
  doc.text(`Emissão: ${data || "—"}   Validade: ${validade || "—"}`, W - 12, 25.5, { align: "right" });

  y = 36;

  // ==== Bloco Cliente ====
  doc.setFillColor(...LIGHT);
  doc.rect(8, y, W - 16, 30, "F");
  doc.setDrawColor(...BLACK);
  doc.setLineWidth(0.2);
  doc.rect(8, y, W - 16, 30);
  doc.setTextColor(...BLACK);
  doc.setFontSize(7).setFont(undefined, "bold");
  doc.text("CLIENTE", 11, y + 5);
  doc.setFont(undefined, "normal").setFontSize(9);
  doc.text(cliente?.nomeFantasia || cliente?.razaoSocial || "—", 11, y + 10);
  doc.setFontSize(7).setTextColor(...GRAY);
  doc.text(`CNPJ: ${cliente?.cnpj || "—"}    IE: ${cliente?.ie || "—"}`, 11, y + 14);
  doc.text(`${cliente?.rua || ""}, ${cliente?.numero || ""} ${cliente?.complemento || ""}`, 11, y + 18);
  doc.text(`${cliente?.bairro || ""} · ${cliente?.cidade || ""}/${cliente?.estado || ""} · CEP ${cliente?.cep || ""}`, 11, y + 22);
  doc.text(`Contato: ${cliente?.contato || "—"}   ${cliente?.telefone || ""}   ${cliente?.email || ""}`, 11, y + 26);

  // Coluna direita: condições
  const rx = W / 2 + 6;
  doc.setFont(undefined, "bold").setFontSize(7).setTextColor(...BLACK);
  doc.text("CONDIÇÕES COMERCIAIS", rx, y + 5);
  doc.setFont(undefined, "normal").setFontSize(8).setTextColor(...BLACK);
  const info = [
    ["Cond. Pagamento:", condicaoPagamento || "—"],
    ["Transportadora:", transportadora || "—"],
    ["Tipo Frete:", tipoFrete || "—"],
    ["Vendedor:", vendedor || "—"],
  ];
  info.forEach((row, i) => {
    doc.setFont(undefined, "normal").setTextColor(...GRAY).setFontSize(7);
    doc.text(row[0], rx, y + 10 + i * 5);
    doc.setFont(undefined, "bold").setTextColor(...BLACK).setFontSize(8);
    doc.text(row[1], rx + 30, y + 10 + i * 5);
  });

  y += 34;

  // ==== Tabela de itens ====
  const rows = itens.map((it, i) => {
    const r = calcularPrecoFinal(it);
    return [
      String(i + 1).padStart(2, "0"),
      it.codigo || "-",
      it.descricao || "-",
      it.revestimento || "-",
      fmtNum(it.peso || 0, 3),
      String(it.quantidade || 0),
      fmtBRL(it.precoVenda || 0),
      fmtPct(it.margemRevestimento || 0),
      fmtPct(it.ipi || 0),
      fmtPct(it.icms || 0),
      fmtBRL(r.totalItem),
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [[
      "#", "Código", "Descrição", "Revestimento", "Peso (kg)", "Qtd",
      "Valor Unit.", "Marg. Rev.", "IPI %", "ICMS %", "Total Item",
    ]],
    body: rows,
    styles: { fontSize: 7, cellPadding: 1.6, valign: "middle" },
    headStyles: { fillColor: BLACK, textColor: YELLOW, fontStyle: "bold" },
    alternateRowStyles: { fillColor: LIGHT },
    columnStyles: {
      0: { halign: "center", cellWidth: 8 },
      1: { cellWidth: 20 },
      2: { cellWidth: 55 },
      4: { halign: "right" },
      5: { halign: "right" },
      6: { halign: "right" },
      7: { halign: "right" },
      8: { halign: "right" },
      9: { halign: "right" },
      10: { halign: "right", fontStyle: "bold" },
    },
    theme: "grid",
    margin: { left: 8, right: 8 },
  });

  y = doc.lastAutoTable.finalY + 6;

  // ==== Totais ====
  const t = totaisOrcamento(itens, valorFrete);

  const totaisData = [
    ["Total dos Produtos", fmtBRL(t.totalProdutos)],
    ["Total do IPI", fmtBRL(t.totalIpi)],
    ["Total do ICMS", fmtBRL(t.totalIcms)],
    ["Total ICMS-ST", fmtBRL(t.totalIcmsSt)],
    ["Peso Total (kg)", fmtNum(t.pesoTotal, 3)],
    ["Valor do Frete", fmtBRL(t.valorFrete)],
  ];

  const tw = 90;
  const tx = W - 8 - tw;

  totaisData.forEach((row, i) => {
    const yy = y + i * 5;
    doc.setFillColor(...LIGHT);
    if (i % 2 === 0) doc.rect(tx, yy, tw, 5, "F");
    doc.setFont(undefined, "normal").setFontSize(8).setTextColor(...GRAY);
    doc.text(row[0], tx + 2, yy + 3.5);
    doc.setFont(undefined, "bold").setTextColor(...BLACK);
    doc.text(row[1], tx + tw - 2, yy + 3.5, { align: "right" });
  });

  const totalY = y + totaisData.length * 5 + 2;
  doc.setFillColor(...BLACK);
  doc.rect(tx, totalY, tw, 9, "F");
  doc.setFillColor(...YELLOW);
  doc.rect(tx, totalY + 9, tw, 0.8, "F");
  doc.setTextColor(...YELLOW);
  doc.setFont(undefined, "bold").setFontSize(9);
  doc.text("TOTAL GERAL DO PEDIDO", tx + 2, totalY + 5.5);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text(fmtBRL(t.totalGeral), tx + tw - 2, totalY + 6, { align: "right" });

  // Observações à esquerda
  if (observacoes) {
    doc.setTextColor(...BLACK).setFont(undefined, "bold").setFontSize(7);
    doc.text("OBSERVAÇÕES", 10, y + 2);
    doc.setFont(undefined, "normal").setFontSize(8).setTextColor(...GRAY);
    const lines = doc.splitTextToSize(observacoes, W / 2 - 12);
    doc.text(lines, 10, y + 6);
  }

  // ==== Rodapé / assinatura ====
  const footY = doc.internal.pageSize.getHeight() - 30;
  doc.setDrawColor(...GRAY).setLineWidth(0.2);
  doc.line(20, footY, 90, footY);
  doc.setFontSize(7).setTextColor(...GRAY);
  doc.text(vendedor || "Vendedor Responsável", 55, footY + 4, { align: "center" });
  doc.text("Assinatura do vendedor", 55, footY + 8, { align: "center" });

  doc.line(W - 90, footY, W - 20, footY);
  doc.text("Aceite do cliente", W - 55, footY + 4, { align: "center" });
  doc.text(cliente?.nomeFantasia || "Cliente", W - 55, footY + 8, { align: "center" });

  // Faixa inferior
  doc.setFillColor(...BLACK);
  doc.rect(0, doc.internal.pageSize.getHeight() - 12, W, 12, "F");
  doc.setFillColor(...YELLOW);
  doc.rect(0, doc.internal.pageSize.getHeight() - 12, W, 1.2, "F");
  doc.setTextColor(220, 220, 220).setFontSize(7).setFont(undefined, "normal");
  doc.text(`${empresa.razaoSocial}  ·  ${empresa.telefone}  ·  ${empresa.email}`, 10, doc.internal.pageSize.getHeight() - 5);
  doc.setTextColor(...YELLOW).setFont(undefined, "bold");
  doc.text(empresa.tagline, W - 10, doc.internal.pageSize.getHeight() - 5, { align: "right" });

  doc.save(`Orcamento_${numero || Date.now()}.pdf`);
}
