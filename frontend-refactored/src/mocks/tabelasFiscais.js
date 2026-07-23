// Tabelas fiscais e comerciais do ABSOLUTA ERP
// Todas configuráveis via módulo IMPOSTOS.

export const UFS = [
  { uf: "AC", estado: "Acre" }, { uf: "AL", estado: "Alagoas" }, { uf: "AP", estado: "Amapá" },
  { uf: "AM", estado: "Amazonas" }, { uf: "BA", estado: "Bahia" }, { uf: "CE", estado: "Ceará" },
  { uf: "DF", estado: "Distrito Federal" }, { uf: "ES", estado: "Espírito Santo" },
  { uf: "GO", estado: "Goiás" }, { uf: "MA", estado: "Maranhão" }, { uf: "MT", estado: "Mato Grosso" },
  { uf: "MS", estado: "Mato Grosso do Sul" }, { uf: "MG", estado: "Minas Gerais" },
  { uf: "PA", estado: "Pará" }, { uf: "PB", estado: "Paraíba" }, { uf: "PR", estado: "Paraná" },
  { uf: "PE", estado: "Pernambuco" }, { uf: "PI", estado: "Piauí" }, { uf: "RJ", estado: "Rio de Janeiro" },
  { uf: "RN", estado: "Rio Grande do Norte" }, { uf: "RS", estado: "Rio Grande do Sul" },
  { uf: "RO", estado: "Rondônia" }, { uf: "RR", estado: "Roraima" }, { uf: "SC", estado: "Santa Catarina" },
  { uf: "SP", estado: "São Paulo" }, { uf: "SE", estado: "Sergipe" }, { uf: "TO", estado: "Tocantins" },
];

// ICMS por UF — alíquotas interestadual (saindo de SP p/ o estado) e interna do estado
export const mockICMS = UFS.map(({ uf, estado }) => {
  const isSul = ["MG","PR","RJ","RS","SC"].includes(uf);
  const isSP = uf === "SP";
  return {
    id: `ICMS-${uf}`,
    uf, estado,
    aliquotaInterestadual: isSP ? 18 : isSul ? 12 : 7,
    aliquotaInterna: ({
      AC:19, AL:19, AM:20, AP:18, BA:19, CE:18, DF:17, ES:17, GO:17, MA:20, MT:17,
      MS:17, MG:18, PA:19, PB:18, PR:19, PE:18, PI:18, RJ:18, RN:18, RS:17, RO:17,
      RR:20, SC:17, SP:18, SE:18, TO:18,
    })[uf] || 18,
    situacaoTributaria: "000 - Tributada Integralmente",
    observacoes: isSP ? "Operações internas SP" : "",
  };
});

// NCM — Nomenclatura Comum do Mercosul (com IPI vinculado)
export const mockNCM = [
  { id: "NCM-01", ncm: "7318.15.00", descricao: "Parafusos e pinos ou pernos, roscados",         ipi: 6.5, categoria: "Parafusos",  observacoes: "" },
  { id: "NCM-02", ncm: "7318.16.00", descricao: "Porcas",                                          ipi: 5.0, categoria: "Porcas",     observacoes: "" },
  { id: "NCM-03", ncm: "7318.21.00", descricao: "Arruelas de pressão e outras arruelas de segurança",ipi: 8.0, categoria: "Arruelas",   observacoes: "" },
  { id: "NCM-04", ncm: "7318.22.00", descricao: "Outras arruelas",                                 ipi: 8.0, categoria: "Arruelas",   observacoes: "" },
  { id: "NCM-05", ncm: "7318.14.00", descricao: "Parafusos autoatarraxantes",                      ipi: 5.0, categoria: "Parafusos",  observacoes: "" },
  { id: "NCM-06", ncm: "7318.29.00", descricao: "Outros artigos não roscados",                     ipi: 9.0, categoria: "Fixadores",  observacoes: "" },
  { id: "NCM-07", ncm: "7616.10.00", descricao: "Tachas, pregos, rebites e artigos semelhantes",   ipi: 6.5, categoria: "Rebites",    observacoes: "Alumínio" },
  { id: "NCM-08", ncm: "3926.90.90", descricao: "Outras obras de plásticos",                       ipi: 10.0, categoria: "Buchas",    observacoes: "Nylon" },
];

// Tabela de margens por categoria (margem padrão + desconto máximo permitido)
export const mockMargens = [
  { id: "MG-01", categoria: "Parafusos",  margemPadrao: 35, descontoMax: 15, observacoes: "" },
  { id: "MG-02", categoria: "Porcas",     margemPadrao: 30, descontoMax: 12, observacoes: "" },
  { id: "MG-03", categoria: "Arruelas",   margemPadrao: 28, descontoMax: 10, observacoes: "" },
  { id: "MG-04", categoria: "Fixadores",  margemPadrao: 40, descontoMax: 15, observacoes: "" },
  { id: "MG-05", categoria: "Rebites",    margemPadrao: 32, descontoMax: 10, observacoes: "" },
  { id: "MG-06", categoria: "Buchas",     margemPadrao: 45, descontoMax: 15, observacoes: "" },
  { id: "MG-07", categoria: "Pinos",      margemPadrao: 38, descontoMax: 12, observacoes: "" },
  { id: "MG-08", categoria: "Prisioneiros",margemPadrao:42, descontoMax: 12, observacoes: "" },
];

export const mockRevestimentos = [
  { id: "rev-01", nome: "Natural",          margem: 0,  descricao: "Sem tratamento superficial.",    ativo: true },
  { id: "rev-02", nome: "Bicromatizado",    margem: 8,  descricao: "Cromato amarelo / verde.",       ativo: true },
  { id: "rev-03", nome: "Zincado Branco",   margem: 5,  descricao: "Zincado eletrolítico branco.",   ativo: true },
  { id: "rev-04", nome: "Zincado Amarelo",  margem: 8,  descricao: "Zincado eletrolítico amarelo.",  ativo: true },
  { id: "rev-05", nome: "Galvanizado",      margem: 10, descricao: "Galvanizado a fogo.",            ativo: true },
  { id: "rev-06", nome: "Geomet",           margem: 18, descricao: "Geomet 500.",                    ativo: true },
  { id: "rev-07", nome: "Dacromet",         margem: 25, descricao: "Zinco-alumínio Dacromet.",       ativo: true },
  { id: "rev-08", nome: "Fosfatizado",      margem: 7,  descricao: "Fosfato de zinco / manganês.",   ativo: true },
  { id: "rev-09", nome: "Inox",             margem: 30, descricao: "Aço inoxidável natural.",        ativo: true },
  { id: "rev-10", nome: "Oxidado Preto",    margem: 4,  descricao: "Oxidação preta / negra.",        ativo: true },
];

// Tabela de fretes — CIF por região destino
export const mockFretes = [
  { id: "FR-01", regiao: "Grande São Paulo",  tipo: "CIF", modalidade: "Rodoviário", valorFixo: 150,  valorPorKg: 0.35, prazoDias: 2, observacoes: "" },
  { id: "FR-02", regiao: "Interior de SP",    tipo: "CIF", modalidade: "Rodoviário", valorFixo: 220,  valorPorKg: 0.55, prazoDias: 3, observacoes: "" },
  { id: "FR-03", regiao: "Sul (PR/SC/RS)",    tipo: "CIF", modalidade: "Rodoviário", valorFixo: 320,  valorPorKg: 0.80, prazoDias: 4, observacoes: "" },
  { id: "FR-04", regiao: "Sudeste (RJ/ES/MG)",tipo: "CIF", modalidade: "Rodoviário", valorFixo: 280,  valorPorKg: 0.70, prazoDias: 4, observacoes: "" },
  { id: "FR-05", regiao: "Centro-Oeste",      tipo: "CIF", modalidade: "Rodoviário", valorFixo: 380,  valorPorKg: 0.95, prazoDias: 5, observacoes: "" },
  { id: "FR-06", regiao: "Nordeste",          tipo: "CIF", modalidade: "Rodoviário", valorFixo: 480,  valorPorKg: 1.20, prazoDias: 7, observacoes: "" },
  { id: "FR-07", regiao: "Norte",             tipo: "CIF", modalidade: "Rodoviário", valorFixo: 620,  valorPorKg: 1.50, prazoDias: 9, observacoes: "" },
  { id: "FR-08", regiao: "Retirada na fábrica",tipo: "FOB", modalidade: "-",         valorFixo: 0,    valorPorKg: 0,    prazoDias: 0, observacoes: "Cliente busca" },
];

// Tabela de descontos — por perfil comercial / volume
export const mockDescontos = [
  { id: "DS-01", nome: "Cliente Padrão",       percentual: 5,   valorMinimo: 0,     validoPara: "Todos",       observacoes: "" },
  { id: "DS-02", nome: "Cliente Premium",      percentual: 10,  valorMinimo: 5000,  validoPara: "Premium",     observacoes: "Aprovação vendedor" },
  { id: "DS-03", nome: "Volume 10.000+",       percentual: 12,  valorMinimo: 10000, validoPara: "Todos",       observacoes: "" },
  { id: "DS-04", nome: "Grande Conta",         percentual: 15,  valorMinimo: 25000, validoPara: "Estratégico", observacoes: "Aprovação gerência" },
  { id: "DS-05", nome: "Fidelidade 12m",       percentual: 8,   valorMinimo: 0,     validoPara: "Fidelizado",  observacoes: "" },
];

// Tabela de condições de pagamento
export const mockCondPagamento = [
  { id: "CP-01", codigo: "AV",      descricao: "À vista",                parcelas: 1, prazoDias: 0,   acrescimo: 0,  desconto: 3, ativo: true },
  { id: "CP-02", codigo: "7D",      descricao: "7 dias",                 parcelas: 1, prazoDias: 7,   acrescimo: 0,  desconto: 2, ativo: true },
  { id: "CP-03", codigo: "15D",     descricao: "15 dias",                parcelas: 1, prazoDias: 15,  acrescimo: 0,  desconto: 1, ativo: true },
  { id: "CP-04", codigo: "30D",     descricao: "30 dias",                parcelas: 1, prazoDias: 30,  acrescimo: 0,  desconto: 0, ativo: true },
  { id: "CP-05", codigo: "30-60",   descricao: "30/60 dias",             parcelas: 2, prazoDias: 60,  acrescimo: 1,  desconto: 0, ativo: true },
  { id: "CP-06", codigo: "30-60-90",descricao: "30/60/90 dias",          parcelas: 3, prazoDias: 90,  acrescimo: 2,  desconto: 0, ativo: true },
  { id: "CP-07", codigo: "45D",     descricao: "45 dias",                parcelas: 1, prazoDias: 45,  acrescimo: 0.5, desconto: 0, ativo: true },
  { id: "CP-08", codigo: "BOL28",   descricao: "Boleto 28 dias",         parcelas: 1, prazoDias: 28,  acrescimo: 0,  desconto: 0, ativo: true },
];

// Fornecedores
export const mockFornecedores = [
  { id: "FOR-001", nome: "SteelFast Distribuidora", cnpj: "12.888.111/0001-33", contato: "Marco Reis",    telefone: "(11) 4488-9900" },
  { id: "FOR-002", nome: "InoxBrasil Importação",   cnpj: "22.999.222/0001-44", contato: "Cláudia Terra", telefone: "(19) 3311-2244" },
  { id: "FOR-003", nome: "Metal Prime Ind.",        cnpj: "33.111.333/0001-55", contato: "Alan Costa",    telefone: "(31) 2299-8811" },
  { id: "FOR-004", nome: "Fixadores Nacional S/A",  cnpj: "44.222.444/0001-66", contato: "Beatriz Souza", telefone: "(19) 4400-1122" },
];

// Módulos preparados para futura implementação (placeholders)
export const PLACEHOLDER_MODULES = ["ICMS-ST", "PIS", "COFINS"];
