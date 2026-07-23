// Mock data for ABSOLUTA ERP (front-end only demonstration)

export const mockUser = {
  id: "u-001",
  name: "Rafael Andrade",
  role: "Administrador",
  email: "admin@absolutafixadores.com.br",
  avatar: "RA",
};

export const empresa = {
  razaoSocial: "Absoluta Fixadores Ltda.",
  nomeFantasia: "Absoluta Fixadores",
  cnpj: "45.789.123/0001-70",
  ie: "123.456.789.000",
  endereco: "Rua Industrial, 2500 · Distrito Industrial",
  cidade: "São Paulo / SP",
  cep: "04101-300",
  telefone: "(11) 4488-9900",
  email: "contato@absolutafixadores.com.br",
  tagline: "Fixando qualidade. Garantindo soluções.",
};

// Revestimentos configuráveis (cada um com sua margem)
export const mockRevestimentos = [
  { id: "rev-01", nome: "Natural",          margem: 0,  descricao: "Sem tratamento superficial." },
  { id: "rev-02", nome: "Bicromatizado",    margem: 8,  descricao: "Cromato amarelo / verde." },
  { id: "rev-03", nome: "Zincado Branco",   margem: 5,  descricao: "Zincado eletrolítico branco." },
  { id: "rev-04", nome: "Zincado Amarelo",  margem: 6,  descricao: "Zincado eletrolítico amarelo." },
  { id: "rev-05", nome: "Galvanizado",      margem: 10, descricao: "Galvanizado a fogo." },
  { id: "rev-06", nome: "Geomet",           margem: 18, descricao: "Revestimento inorgânico Geomet 500." },
  { id: "rev-07", nome: "Dacromet",         margem: 25, descricao: "Revestimento zinco-alumínio Dacromet." },
  { id: "rev-08", nome: "Fosfatizado",      margem: 7,  descricao: "Fosfato de zinco / manganês." },
  { id: "rev-09", nome: "Inox",             margem: 15, descricao: "Aço inoxidável natural." },
  { id: "rev-10", nome: "Oxidado Preto",    margem: 4,  descricao: "Oxidação preta / negra." },
];

// Regras fiscais / impostos
export const mockImpostos = [
  { id: "TAX-001", nome: "Fixadores Nacional Padrão", aplicaA: "Categoria", target: "Parafusos",
    icms: 18, ipi: 5, icmsSt: 0, pis: 1.65, cofins: 7.6,
    ncm: "7318.15.00", cfop: "5102", cst: "000", origem: "0 - Nacional", ativo: true },
  { id: "TAX-002", nome: "Porcas e Arruelas", aplicaA: "Categoria", target: "Porcas",
    icms: 18, ipi: 5, icmsSt: 0, pis: 1.65, cofins: 7.6,
    ncm: "7318.16.00", cfop: "5102", cst: "000", origem: "0 - Nacional", ativo: true },
  { id: "TAX-003", nome: "Arruelas Aço", aplicaA: "Categoria", target: "Arruelas",
    icms: 18, ipi: 5, icmsSt: 0, pis: 1.65, cofins: 7.6,
    ncm: "7318.22.00", cfop: "5102", cst: "000", origem: "0 - Nacional", ativo: true },
  { id: "TAX-004", nome: "Fixadores Inox Importado", aplicaA: "Grupo", target: "Inox Premium",
    icms: 18, ipi: 8, icmsSt: 0, pis: 1.65, cofins: 7.6,
    ncm: "7318.15.00", cfop: "5102", cst: "100", origem: "1 - Estrangeira Importação Direta", ativo: true },
  { id: "TAX-005", nome: "Rebites Alumínio", aplicaA: "Categoria", target: "Rebites",
    icms: 18, ipi: 6.5, icmsSt: 0, pis: 1.65, cofins: 7.6,
    ncm: "7616.10.00", cfop: "5102", cst: "000", origem: "0 - Nacional", ativo: true },
  { id: "TAX-006", nome: "Cliente Premium (isento ST)", aplicaA: "Cliente", target: "Metalúrgica Vega Ltda.",
    icms: 12, ipi: 5, icmsSt: 0, pis: 1.65, cofins: 7.6,
    ncm: "7318.15.00", cfop: "5405", cst: "010", origem: "0 - Nacional", ativo: true },
];

export const OPCOES_ORIGEM = [
  "0 - Nacional",
  "1 - Estrangeira Importação Direta",
  "2 - Estrangeira Adquirida no Mercado Interno",
  "3 - Nacional com mais de 40% de conteúdo estrangeiro",
  "4 - Nacional produzida em conformidade com processos produtivos básicos",
  "5 - Nacional com menos de 40% de conteúdo estrangeiro",
  "6 - Estrangeira Importação Direta, sem similar nacional",
  "7 - Estrangeira Adquirida no Mercado Interno, sem similar nacional",
  "8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%",
];

export const OPCOES_CST = ["000","010","020","030","040","041","050","051","060","070","090","100","102","103","200","202","203","300","400","500","900"];
export const OPCOES_CFOP_SAIDA = ["5101","5102","5103","5104","5401","5402","5403","5405","6101","6102","6108"];

export const OPCOES_APLICA_A = ["Produto", "Categoria", "Cliente", "Grupo"];

export const OPCOES_GRUPO = [
  "Fixadores Standard",
  "Fixadores Premium",
  "Fixadores Estruturais",
  "Inox Premium",
  "Fixadores Automotivos",
  "Fixadores Navais",
];

export const OPCOES_UNIDADE = ["UN", "CX", "KG", "MT", "PC", "PAR", "MI"];

export const mockClientes = [
  {
    id: "CLI-001", codigo: "10245", razaoSocial: "Metalúrgica Vega Ltda.",
    nomeFantasia: "Vega Metals", cnpj: "12.345.678/0001-90", ie: "123.456.789.111",
    segmento: "Metalúrgica", contato: "Bruno Salles", cargo: "Comprador",
    telefone: "(11) 3654-8899", whatsapp: "(11) 98877-6655", email: "bruno@vegametals.com.br",
    cep: "09720-000", rua: "Av. Industrial", numero: "1450", complemento: "Galpão 4",
    bairro: "Distrito Industrial", cidade: "São Bernardo do Campo", estado: "SP",
    vendedor: "Camila Ferreira", condicaoPagamento: "30/60/90 dias",
    limiteCredito: 250000, observacoes: "Cliente premium desde 2018.",
    status: "Ativo", createdAt: "2024-06-14",
  },
  {
    id: "CLI-002", codigo: "10247", razaoSocial: "InoxPar Indústria S/A",
    nomeFantasia: "InoxPar", cnpj: "22.987.654/0001-33", ie: "555.777.222.888",
    segmento: "Automotivo", contato: "Larissa Prado", cargo: "Suprimentos",
    telefone: "(19) 3221-4488", whatsapp: "(19) 99911-2233", email: "larissa@inoxpar.com.br",
    cep: "13100-500", rua: "Rod. SP-101, KM 12", numero: "s/n", complemento: "",
    bairro: "Zona Industrial", cidade: "Campinas", estado: "SP",
    vendedor: "Ricardo Nunes", condicaoPagamento: "45 dias",
    limiteCredito: 400000, observacoes: "Volume mensal alto - parafusos M6/M8.",
    status: "Ativo", createdAt: "2024-08-02",
  },
  {
    id: "CLI-003", codigo: "10251", razaoSocial: "Construtora Prisma Engenharia Ltda.",
    nomeFantasia: "Prisma Engenharia", cnpj: "33.111.222/0001-45", ie: "ISENTO",
    segmento: "Construção Civil", contato: "Hugo Bastos", cargo: "Engenheiro",
    telefone: "(31) 3444-2211", whatsapp: "(31) 98800-1177", email: "hugo@prismaeng.com.br",
    cep: "31270-901", rua: "Rua Pampulha", numero: "770", complemento: "Sala 12",
    bairro: "Ouro Preto", cidade: "Belo Horizonte", estado: "MG",
    vendedor: "Camila Ferreira", condicaoPagamento: "À vista",
    limiteCredito: 80000, observacoes: "",
    status: "Ativo", createdAt: "2025-01-20",
  },
  {
    id: "CLI-004", codigo: "10259", razaoSocial: "Naval Sul Reparos Ltda.",
    nomeFantasia: "Naval Sul", cnpj: "44.555.888/0001-77", ie: "987.654.321.000",
    segmento: "Naval", contato: "Marina Chagas", cargo: "Compras Técnicas",
    telefone: "(51) 3210-9988", whatsapp: "(51) 99900-4433", email: "marina@navalsul.com.br",
    cep: "90040-060", rua: "Av. Ipiranga", numero: "3200", complemento: "",
    bairro: "Praia de Belas", cidade: "Porto Alegre", estado: "RS",
    vendedor: "Ricardo Nunes", condicaoPagamento: "30 dias",
    limiteCredito: 150000, observacoes: "Preferência por inox 316.",
    status: "Ativo", createdAt: "2025-03-11",
  },
  {
    id: "CLI-005", codigo: "10263", razaoSocial: "Agromec Máquinas Agrícolas Ltda.",
    nomeFantasia: "Agromec", cnpj: "55.222.333/0001-11", ie: "111.222.333.444",
    segmento: "Agrícola", contato: "Diego Marques", cargo: "Gerente Compras",
    telefone: "(44) 3055-1122", whatsapp: "(44) 98811-2244", email: "diego@agromec.com.br",
    cep: "87020-030", rua: "Av. Colombo", numero: "5590", complemento: "",
    bairro: "Zona 7", cidade: "Maringá", estado: "PR",
    vendedor: "Camila Ferreira", condicaoPagamento: "30/60 dias",
    limiteCredito: 200000, observacoes: "",
    status: "Inativo", createdAt: "2024-11-05",
  },
  {
    id: "CLI-006", codigo: "10270", razaoSocial: "TecnoAço Fabricação Ltda.",
    nomeFantasia: "TecnoAço", cnpj: "66.333.444/0001-22", ie: "222.333.444.555",
    segmento: "Metalúrgica", contato: "Patrícia Lemos", cargo: "Diretora",
    telefone: "(48) 3266-4477", whatsapp: "(48) 99988-7766", email: "patricia@tecnoaco.com.br",
    cep: "88040-400", rua: "Rod. SC-401", numero: "1500", complemento: "",
    bairro: "Saco Grande", cidade: "Florianópolis", estado: "SC",
    vendedor: "Ricardo Nunes", condicaoPagamento: "À vista",
    limiteCredito: 120000, observacoes: "Novo cliente.",
    status: "Ativo", createdAt: "2025-05-22",
  },
];

// Produtos com todos os campos fiscais / comerciais
export const mockProdutos = [
  {
    id: "PRD-001", codigoInterno: "PAR-M8-30", codigoFabricante: "HXB-M8X30-A2",
    referencia: "DIN933-M8x30", nome: "Parafuso Sextavado M8 x 30mm",
    descricao: "Parafuso sextavado rosca total conforme DIN 933.",
    categoria: "Parafusos", subcategoria: "Sextavado", marca: "Absoluta", linha: "Standard",
    grupo: "Fixadores Standard",
    material: "Aço Carbono", acabamento: "Zincado Branco", revestimento: "Zincado Branco", cor: "Prata",
    norma: "DIN 933", ncm: "7318.15.00", procedencia: "0 - Nacional",
    diametro: "M8", comprimento: "30 mm", rosca: "Métrica", passo: "1.25",
    peso: 0.014, unidade: "UN", embalagem: "Caixa 500un",
    estoque: 12480, estoqueMinimo: 2000,
    precoCusto: 0.42, precoLista: 1.10, desconto: 5, lucro: 45, precoVenda: 0.89,
    ipi: 5, icms: 18,
    aplicacao: "Montagens gerais, estruturas, chaparia.",
    imagem: "https://images.pexels.com/photos/5279361/pexels-photo-5279361.jpeg",
  },
  {
    id: "PRD-002", codigoInterno: "PAR-M10-40", codigoFabricante: "HXB-M10X40-INX",
    referencia: "ISO4014-M10x40", nome: "Parafuso Sextavado Inox M10 x 40mm",
    descricao: "Parafuso sextavado rosca parcial inox 304.",
    categoria: "Parafusos", subcategoria: "Sextavado", marca: "Absoluta", linha: "Premium",
    grupo: "Inox Premium",
    material: "Inox 304", acabamento: "Polido", revestimento: "Inox", cor: "Natural",
    norma: "ISO 4014", ncm: "7318.15.00", procedencia: "1 - Estrangeira Importação Direta",
    diametro: "M10", comprimento: "40 mm", rosca: "Métrica", passo: "1.5",
    peso: 0.032, unidade: "UN", embalagem: "Caixa 200un",
    estoque: 3200, estoqueMinimo: 500,
    precoCusto: 1.85, precoLista: 4.20, desconto: 10, lucro: 55, precoVenda: 3.40,
    ipi: 8, icms: 18,
    aplicacao: "Ambientes corrosivos, indústria naval e alimentícia.",
    imagem: "https://images.pexels.com/photos/28752153/pexels-photo-28752153.jpeg",
  },
  {
    id: "PRD-003", codigoInterno: "POR-M8-ZB", codigoFabricante: "NUT-M8-ZB",
    referencia: "DIN934-M8", nome: "Porca Sextavada M8 Zincada",
    descricao: "Porca sextavada zincada branca DIN 934.",
    categoria: "Porcas", subcategoria: "Sextavada", marca: "Absoluta", linha: "Standard",
    grupo: "Fixadores Standard",
    material: "Aço Carbono", acabamento: "Zincado Branco", revestimento: "Zincado Branco", cor: "Prata",
    norma: "DIN 934", ncm: "7318.16.00", procedencia: "0 - Nacional",
    diametro: "M8", comprimento: "-", rosca: "Métrica", passo: "1.25",
    peso: 0.005, unidade: "UN", embalagem: "Caixa 1000un",
    estoque: 22500, estoqueMinimo: 5000,
    precoCusto: 0.11, precoLista: 0.30, desconto: 5, lucro: 40, precoVenda: 0.24,
    ipi: 5, icms: 18,
    aplicacao: "Complemento para parafusos M8.",
    imagem: "https://images.pexels.com/photos/30496227/pexels-photo-30496227.jpeg",
  },
  {
    id: "PRD-004", codigoInterno: "ARR-M8-PLA", codigoFabricante: "WSH-M8-FL",
    referencia: "DIN125-M8", nome: "Arruela Lisa M8",
    descricao: "Arruela lisa zincada DIN 125.",
    categoria: "Arruelas", subcategoria: "Lisa", marca: "Absoluta", linha: "Standard",
    grupo: "Fixadores Standard",
    material: "Aço Carbono", acabamento: "Zincado Branco", revestimento: "Zincado Branco", cor: "Prata",
    norma: "DIN 125", ncm: "7318.22.00", procedencia: "0 - Nacional",
    diametro: "8.4 mm", comprimento: "-", rosca: "-", passo: "-",
    peso: 0.002, unidade: "UN", embalagem: "Caixa 2000un",
    estoque: 480, estoqueMinimo: 1500,
    precoCusto: 0.04, precoLista: 0.12, desconto: 5, lucro: 40, precoVenda: 0.10,
    ipi: 5, icms: 18,
    aplicacao: "Distribuição de carga em parafusos M8.",
    imagem: "https://images.pexels.com/photos/5279361/pexels-photo-5279361.jpeg",
  },
  {
    id: "PRD-005", codigoInterno: "PAR-ALLEN-M6", codigoFabricante: "ALL-M6X20",
    referencia: "DIN912-M6x20", nome: "Parafuso Allen M6 x 20mm",
    descricao: "Parafuso Allen cabeça cilíndrica DIN 912 - 12.9.",
    categoria: "Parafusos", subcategoria: "Allen", marca: "Absoluta", linha: "Premium",
    grupo: "Fixadores Premium",
    material: "Aço 12.9", acabamento: "Oxidado Preto", revestimento: "Oxidado Preto", cor: "Preto",
    norma: "DIN 912", ncm: "7318.15.00", procedencia: "0 - Nacional",
    diametro: "M6", comprimento: "20 mm", rosca: "Métrica", passo: "1.0",
    peso: 0.008, unidade: "UN", embalagem: "Caixa 500un",
    estoque: 8760, estoqueMinimo: 1500,
    precoCusto: 0.55, precoLista: 1.60, desconto: 8, lucro: 50, precoVenda: 1.20,
    ipi: 5, icms: 18,
    aplicacao: "Máquinas, moldes, ferramental de precisão.",
    imagem: "https://images.pexels.com/photos/28752153/pexels-photo-28752153.jpeg",
  },
  {
    id: "PRD-006", codigoInterno: "PAR-AUTO-42-13", codigoFabricante: "SCR-SLF-4.2X13",
    referencia: "DIN7981-4.2x13", nome: "Parafuso Autoatarraxante 4.2 x 13mm",
    descricao: "Parafuso autoatarraxante cabeça panela.",
    categoria: "Parafusos", subcategoria: "Autoatarraxante", marca: "Absoluta", linha: "Standard",
    grupo: "Fixadores Standard",
    material: "Aço Carbono", acabamento: "Zincado Branco", revestimento: "Zincado Branco", cor: "Prata",
    norma: "DIN 7981", ncm: "7318.14.00", procedencia: "0 - Nacional",
    diametro: "4.2 mm", comprimento: "13 mm", rosca: "Chapa", passo: "-",
    peso: 0.003, unidade: "UN", embalagem: "Caixa 1000un",
    estoque: 15400, estoqueMinimo: 3000,
    precoCusto: 0.09, precoLista: 0.25, desconto: 5, lucro: 42, precoVenda: 0.19,
    ipi: 5, icms: 18,
    aplicacao: "Fixação em chapas metálicas.",
    imagem: "https://images.pexels.com/photos/30496227/pexels-photo-30496227.jpeg",
  },
  {
    id: "PRD-007", codigoInterno: "BUC-EXP-8", codigoFabricante: "ANC-8X40",
    referencia: "ABS-BUC8", nome: "Bucha de Expansão 8mm",
    descricao: "Bucha de expansão nylon para fixação em alvenaria.",
    categoria: "Buchas", subcategoria: "Expansão", marca: "Absoluta", linha: "Standard",
    grupo: "Fixadores Standard",
    material: "Nylon", acabamento: "-", revestimento: "Natural", cor: "Cinza",
    norma: "ABNT", ncm: "3926.90.90", procedencia: "0 - Nacional",
    diametro: "8 mm", comprimento: "40 mm", rosca: "-", passo: "-",
    peso: 0.001, unidade: "UN", embalagem: "Pacote 100un",
    estoque: 6200, estoqueMinimo: 1000,
    precoCusto: 0.08, precoLista: 0.30, desconto: 5, lucro: 60, precoVenda: 0.22,
    ipi: 10, icms: 18,
    aplicacao: "Fixação em concreto e alvenaria.",
    imagem: "https://images.pexels.com/photos/5279361/pexels-photo-5279361.jpeg",
  },
  {
    id: "PRD-008", codigoInterno: "REB-POP-4-10", codigoFabricante: "RIV-4X10",
    referencia: "DIN7337-4x10", nome: "Rebite Pop 4 x 10mm",
    descricao: "Rebite pop alumínio/aço.",
    categoria: "Rebites", subcategoria: "Pop", marca: "Absoluta", linha: "Standard",
    grupo: "Fixadores Standard",
    material: "Alumínio/Aço", acabamento: "Natural", revestimento: "Natural", cor: "Prata",
    norma: "DIN 7337", ncm: "7616.10.00", procedencia: "0 - Nacional",
    diametro: "4 mm", comprimento: "10 mm", rosca: "-", passo: "-",
    peso: 0.001, unidade: "UN", embalagem: "Caixa 1000un",
    estoque: 9800, estoqueMinimo: 2000,
    precoCusto: 0.06, precoLista: 0.18, desconto: 5, lucro: 45, precoVenda: 0.14,
    ipi: 6.5, icms: 18,
    aplicacao: "União permanente em chaparia leve.",
    imagem: "https://images.pexels.com/photos/28752153/pexels-photo-28752153.jpeg",
  },
];

export const mockOrcamentos = [
  { id: "ORC-2025-0142", numero: "0142", clienteId: "CLI-001", cliente: "Metalúrgica Vega Ltda.",
    data: "2025-01-28", validade: "2025-02-27", valor: 18450.90, status: "Aprovado",
    vendedor: "Camila Ferreira", itens: 12, transportadora: "Braspress", tipoFrete: "CIF", valorFrete: 380 },
  { id: "ORC-2025-0143", numero: "0143", clienteId: "CLI-002", cliente: "InoxPar Indústria S/A",
    data: "2025-01-29", validade: "2025-02-28", valor: 42890.00, status: "Negociação",
    vendedor: "Ricardo Nunes", itens: 24, transportadora: "Jamef", tipoFrete: "FOB", valorFrete: 0 },
  { id: "ORC-2025-0144", numero: "0144", clienteId: "CLI-003", cliente: "Construtora Prisma Engenharia",
    data: "2025-01-30", validade: "2025-03-01", valor: 6720.50, status: "Enviado",
    vendedor: "Camila Ferreira", itens: 6, transportadora: "Rodonaves", tipoFrete: "CIF", valorFrete: 220 },
  { id: "ORC-2025-0145", numero: "0145", clienteId: "CLI-004", cliente: "Naval Sul Reparos Ltda.",
    data: "2025-02-01", validade: "2025-03-03", valor: 15340.00, status: "Aberto",
    vendedor: "Ricardo Nunes", itens: 9, transportadora: "TNT", tipoFrete: "CIF", valorFrete: 480 },
  { id: "ORC-2025-0146", numero: "0146", clienteId: "CLI-006", cliente: "TecnoAço Fabricação Ltda.",
    data: "2025-02-02", validade: "2025-03-04", valor: 9820.75, status: "Cancelado",
    vendedor: "Camila Ferreira", itens: 5, transportadora: "Braspress", tipoFrete: "CIF", valorFrete: 310 },
];

export const mockPedidos = [
  { id: "PED-2025-0091", cliente: "Metalúrgica Vega Ltda.", data: "2025-01-20", valor: 18450.90, status: "Produção", itens: 12 },
  { id: "PED-2025-0092", cliente: "InoxPar Indústria S/A", data: "2025-01-22", valor: 34200.00, status: "Separação", itens: 18 },
  { id: "PED-2025-0093", cliente: "Naval Sul Reparos Ltda.", data: "2025-01-25", valor: 12780.40, status: "Envio", itens: 8 },
  { id: "PED-2025-0094", cliente: "Agromec Máquinas Agrícolas", data: "2025-01-27", valor: 6890.00, status: "Aprovado", itens: 5 },
  { id: "PED-2025-0090", cliente: "TecnoAço Fabricação Ltda.", data: "2025-01-14", valor: 4820.00, status: "Finalizado", itens: 4 },
];

export const mockFornecedores = [
  { id: "FOR-001", nome: "SteelFast Distribuidora", cnpj: "12.888.111/0001-33", contato: "Marco Reis", telefone: "(11) 4488-9900" },
  { id: "FOR-002", nome: "InoxBrasil Importação", cnpj: "22.999.222/0001-44", contato: "Cláudia Terra", telefone: "(19) 3311-2244" },
  { id: "FOR-003", nome: "Metal Prime Ind.", cnpj: "33.111.333/0001-55", contato: "Alan Costa", telefone: "(31) 2299-8811" },
];

export const mockCompras = [
  { id: "CMP-2025-014", fornecedor: "SteelFast Distribuidora", produto: "Parafuso M8 x 30 (Aço Carbono)", quantidade: 20000, valor: 8400.00, prazo: "2025-02-14", status: "Em cotação" },
  { id: "CMP-2025-015", fornecedor: "InoxBrasil Importação", produto: "Parafuso Inox M10 x 40", quantidade: 5000, valor: 9250.00, prazo: "2025-02-20", status: "Aprovada" },
  { id: "CMP-2025-016", fornecedor: "Metal Prime Ind.", produto: "Porcas M8 zincadas", quantidade: 50000, valor: 5500.00, prazo: "2025-02-10", status: "Recebida" },
  { id: "CMP-2025-017", fornecedor: "SteelFast Distribuidora", produto: "Rebites Pop 4x10", quantidade: 30000, valor: 1800.00, prazo: "2025-02-18", status: "Pendente" },
];

export const mockMovimentacoes = [
  { id: "MV-1", data: "2025-02-02 09:14", produto: "Parafuso Sextavado M8 x 30mm", tipo: "Entrada", quantidade: 5000, saldo: 12480, doc: "NF 45882" },
  { id: "MV-2", data: "2025-02-02 11:02", produto: "Porca Sextavada M8", tipo: "Saída", quantidade: 800, saldo: 22500, doc: "PED-2025-0092" },
  { id: "MV-3", data: "2025-02-01 16:45", produto: "Arruela Lisa M8", tipo: "Saída", quantidade: 200, saldo: 480, doc: "PED-2025-0091" },
  { id: "MV-4", data: "2025-02-01 08:20", produto: "Parafuso Allen M6 x 20", tipo: "Entrada", quantidade: 2000, saldo: 8760, doc: "NF 45871" },
  { id: "MV-5", data: "2025-01-31 15:30", produto: "Rebite Pop 4 x 10", tipo: "Saída", quantidade: 500, saldo: 9800, doc: "PED-2025-0090" },
];

export const mockAtividades = [
  { id: 1, tipo: "cliente", texto: "Novo cliente cadastrado: TecnoAço Fabricação Ltda.", tempo: "há 8 min", cor: "yellow" },
  { id: 2, tipo: "orcamento", texto: "Orçamento #0146 criado para Metalúrgica Vega", tempo: "há 22 min", cor: "yellow" },
  { id: 3, tipo: "pedido", texto: "Pedido #0092 aprovado - InoxPar Indústria S/A", tempo: "há 1 h", cor: "green" },
  { id: 4, tipo: "produto", texto: "Produto 'Parafuso Allen M6 x 20' atualizado (estoque)", tempo: "há 2 h", cor: "gray" },
  { id: 5, tipo: "compra", texto: "Cotação enviada a SteelFast (20.000 parafusos)", tempo: "há 3 h", cor: "gray" },
  { id: 6, tipo: "orcamento", texto: "Orçamento #0143 em negociação - InoxPar", tempo: "ontem", cor: "gray" },
];

export const mockUsuarios = [
  { id: "u-001", nome: "Rafael Andrade", email: "admin@absolutafixadores.com.br", perfil: "Administrador", ultimoAcesso: "2025-02-02 09:15", ativo: true },
  { id: "u-002", nome: "Camila Ferreira", email: "camila@absolutafixadores.com.br", perfil: "Vendedor", ultimoAcesso: "2025-02-02 08:40", ativo: true },
  { id: "u-003", nome: "Ricardo Nunes", email: "ricardo@absolutafixadores.com.br", perfil: "Vendedor", ultimoAcesso: "2025-02-01 17:22", ativo: true },
  { id: "u-004", nome: "Julia Sartori", email: "julia@absolutafixadores.com.br", perfil: "Estoque", ultimoAcesso: "2025-02-02 07:55", ativo: true },
  { id: "u-005", nome: "Paulo Vidal", email: "paulo@absolutafixadores.com.br", perfil: "Compras", ultimoAcesso: "2025-01-30 15:10", ativo: false },
];

// Chart datasets
export const chartVendasMes = [
  { mes: "Ago", vendas: 182000 }, { mes: "Set", vendas: 214500 },
  { mes: "Out", vendas: 247800 }, { mes: "Nov", vendas: 231200 },
  { mes: "Dez", vendas: 289400 }, { mes: "Jan", vendas: 312780 },
];

export const chartTopProdutos = [
  { produto: "Parafuso M8x30", qtd: 42800 },
  { produto: "Porca M8 ZB", qtd: 38200 },
  { produto: "Parafuso Inox M10", qtd: 15600 },
  { produto: "Arruela Lisa M8", qtd: 12400 },
  { produto: "Allen M6x20", qtd: 9800 },
];

export const chartSegmentos = [
  { segmento: "Metalúrgica", valor: 38 },
  { segmento: "Automotivo", valor: 24 },
  { segmento: "Construção", valor: 18 },
  { segmento: "Agrícola", valor: 12 },
  { segmento: "Naval", valor: 8 },
];

export const chartOrcamentos = [
  { semana: "S1", abertos: 12, aprovados: 8 },
  { semana: "S2", abertos: 15, aprovados: 11 },
  { semana: "S3", abertos: 18, aprovados: 12 },
  { semana: "S4", abertos: 14, aprovados: 13 },
  { semana: "S5", abertos: 20, aprovados: 16 },
];

export const brand = {
  logoImage: "https://customer-assets-0z36b82j.emergentagent.net/job_30ed45d6-a16a-4d45-a774-736177aec5e1/artifacts/uf1yh31n_logo.png",
  loginBg: "https://images.pexels.com/photos/30496227/pexels-photo-30496227.jpeg",
  dashHero: "https://images.pexels.com/photos/5279361/pexels-photo-5279361.jpeg",
  factory: "https://images.pexels.com/photos/37598393/pexels-photo-37598393.png",
  parts: "https://images.pexels.com/photos/28752153/pexels-photo-28752153.jpeg",
};

export const transportadoras = ["Braspress", "Jamef", "Rodonaves", "TNT", "Correios", "Transportadora Própria"];
export const tiposFrete = ["CIF (por conta do emitente)", "FOB (por conta do destinatário)", "Terceiros", "Sem frete"];
export const condicoesPagamento = ["À vista", "7 dias", "15 dias", "30 dias", "30/60 dias", "30/60/90 dias", "45 dias", "Boleto 28 dias", "Faturamento"];
