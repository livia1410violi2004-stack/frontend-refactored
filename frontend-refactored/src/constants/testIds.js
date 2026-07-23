export const HOME = {
  mainLink: "home-main-link",
};

export const AUTH = {
  loginForm: "login-form",
  usernameInput: "login-username-input",
  passwordInput: "login-password-input",
  submitBtn: "login-submit-btn",
  rememberCheckbox: "login-remember-checkbox",
  forgotLink: "login-forgot-link",
  logoutBtn: "header-logout-btn",
};

export const NAV = {
  sidebar: "sidebar-nav",
  link: (key) => `sidebar-link-${key}`,
  headerUser: "header-user",
  headerNotifications: "header-notifications-btn",
};

export const DASH = {
  root: "dashboard-page",
  kpi: (k) => `dash-kpi-${k}`,
  salesChart: "dash-sales-chart",
  productsChart: "dash-products-chart",
  customersChart: "dash-customers-chart",
  quotesChart: "dash-quotes-chart",
  activityFeed: "dash-activity-feed",
};

export const CLIENTES = {
  page: "clientes-page",
  newBtn: "clientes-new-btn",
  search: "clientes-search-input",
  table: "clientes-table",
  row: (id) => `clientes-row-${id}`,
  viewBtn: (id) => `clientes-view-${id}`,
  editBtn: (id) => `clientes-edit-${id}`,
  form: "cliente-form",
  saveBtn: "cliente-save-btn",
};

export const PRODUTOS = {
  page: "produtos-page",
  newBtn: "produtos-new-btn",
  importBtn: "produtos-import-btn",
  exportBtn: "produtos-export-btn",
  search: "produtos-search-input",
  viewToggle: "produtos-view-toggle",
  table: "produtos-table",
  card: (id) => `produtos-card-${id}`,
  row: (id) => `produtos-row-${id}`,
  form: "produto-form",
  saveBtn: "produto-save-btn",
  importPage: "produtos-import-page",
  importDrop: "produtos-import-dropzone",
  importFile: "produtos-import-file",
  importConfirm: "produtos-import-confirm-btn",
};

export const ORC = {
  page: "orcamentos-page",
  newBtn: "orcamentos-new-btn",
  form: "orcamento-form",
  selectCliente: "orcamento-select-cliente",
  addProduto: "orcamento-add-produto-btn",
  itemRow: (i) => `orcamento-item-${i}`,
  saveBtn: "orcamento-save-btn",
  pdfBtn: "orcamento-pdf-btn",
  sendBtn: "orcamento-send-btn",
};

export const PEDIDOS = { page: "pedidos-page" };
export const COMPRAS = { page: "compras-page" };
export const ESTOQUE = { page: "estoque-page" };
export const RELATORIOS = { page: "relatorios-page" };
export const USUARIOS = { page: "usuarios-page" };
export const CONFIG = { page: "configuracoes-page" };

export const IMPOSTOS = {
  page: "impostos-page",
  newRegraBtn: "impostos-new-regra-btn",
  regraForm: "impostos-regra-form",
  regraSaveBtn: "impostos-regra-save-btn",
  tabRegras: "impostos-tab-regras",
  tabRevestimentos: "impostos-tab-revestimentos",
  newRevestBtn: "impostos-new-revest-btn",
  revestForm: "impostos-revest-form",
  revestSaveBtn: "impostos-revest-save-btn",
  regraRow: (id) => `impostos-regra-${id}`,
  revestRow: (id) => `impostos-revest-${id}`,
};

export const EXPORT = {
  menu: "export-menu",
  csv: "export-csv-btn",
  xlsx: "export-xlsx-btn",
  pdf: "export-pdf-btn",
};
