// Utilitários de cálculo fiscal / margens — versão automática (v2).
// Toda a inteligência de preço parte das tabelas do módulo IMPOSTOS.

import { getNcmByCode, getMargemByCategoria, getRevestimentoByNome, getICMSByUF } from "../services/tabelas.service";

/**
 * Preço de Venda automático:
 * Custo × (1 + Margem Produto%) × (1 + Margem Revestimento%) × (1 + ICMS%) × (1 + IPI%) + Frete
 *
 * @param {object} produto  — { precoCusto, categoria, revestimento, ncm }
 * @param {object} contexto — { ufDestino, valorFrete, descontoManual }
 */
export function calcularPrecoVendaAutomatico(produto, contexto = {}) {
  const custo = Number(produto.precoCusto) || 0;
  const margemProduto = getMargemByCategoria(produto.categoria)?.margemPadrao || 0;
  const margemRev = getRevestimentoByNome(produto.revestimento)?.margem || 0;
  const ipi = getNcmByCode(produto.ncm)?.ipi || 0;
  const uf = contexto.ufDestino || "SP";
  const icmsRow = getICMSByUF(uf);
  const icms = uf === "SP" ? icmsRow?.aliquotaInterna || 18 : icmsRow?.aliquotaInterestadual || 12;
  const frete = Number(contexto.valorFrete) || 0;
  const desconto = Number(contexto.descontoManual) || 0;

  const c1 = custo * (1 + margemProduto / 100);
  const c2 = c1 * (1 + margemRev / 100);
  const c3 = c2 * (1 - desconto / 100);
  const c4 = c3 * (1 + ipi / 100);
  const c5 = c4 * (1 + icms / 100);
  const precoVenda = c5 + frete;

  return {
    custo,
    margemProduto,
    margemRev,
    icms,
    ipi,
    frete,
    desconto,
    aliquotaInterna: icmsRow?.aliquotaInterna,
    aliquotaInterestadual: icmsRow?.aliquotaInterestadual,
    precoVenda,
    lucroBruto: precoVenda - custo - frete,
    // Componentes para exibição na proposta
    valorIcms: c4 * (icms / 100),
    valorIpi: c3 * (ipi / 100),
  };
}

/** Totais consolidados de um orçamento */
export function totaisOrcamento(itens = [], valorFrete = 0, ufDestino = "SP") {
  const acc = itens.reduce(
    (a, it) => {
      const r = calcularPrecoVendaAutomatico(it, { ufDestino, descontoManual: it.desconto });
      const qtd = Number(it.quantidade) || 0;
      a.totalProdutos += r.precoVenda * qtd;
      a.totalIpi += r.valorIpi * qtd;
      a.totalIcms += r.valorIcms * qtd;
      a.pesoTotal += (Number(it.peso) || 0) * qtd;
      a.lucro += r.lucroBruto * qtd;
      return a;
    },
    { totalProdutos: 0, totalIpi: 0, totalIcms: 0, totalIcmsSt: 0, pesoTotal: 0, lucro: 0 }
  );
  acc.valorFrete = Number(valorFrete) || 0;
  acc.totalGeral = acc.totalProdutos + acc.valorFrete;
  return acc;
}

// Retrocompatibilidade — mantém a assinatura antiga para orçamentos legados.
export function calcularPrecoFinal({ precoVenda = 0, quantidade = 1, desconto = 0, ipi = 0, icms = 0 }) {
  const base = Number(precoVenda) || 0;
  const q = Number(quantidade) || 0;
  const comDesc = base * (1 - Number(desconto) / 100);
  const comIpi = comDesc * (1 + Number(ipi) / 100);
  const comIcms = comIpi * (1 + Number(icms) / 100);
  return { unitario: comDesc, precoFinalUnit: comIcms, totalItem: comIcms * q };
}

export const fmtBRL = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(v) || 0);
export const fmtNum = (v, dec = 3) =>
  new Intl.NumberFormat("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(Number(v) || 0);
export const fmtPct = (v) =>
  `${new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(v) || 0)}%`;
