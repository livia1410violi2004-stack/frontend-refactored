// Todos os serviços das tabelas fiscais em um só arquivo — evita fragmentação.
import { mockDelay } from "./api";
import {
  mockICMS, mockNCM, mockMargens, mockRevestimentos, mockFretes,
  mockDescontos, mockCondPagamento, mockFornecedores,
} from "../mocks/tabelasFiscais";

function makeCRUD(seed, idPrefix) {
  let store = [...seed];
  return {
    listSync: () => [...store],
    list: async () => mockDelay([...store]),
    get: async (id) => mockDelay(store.find((x) => x.id === id)),
    create: async (payload) => {
      const item = { id: `${idPrefix}-${Date.now()}`, ativo: true, ...payload };
      store = [item, ...store];
      return mockDelay(item);
    },
    update: async (id, payload) => {
      store = store.map((x) => (x.id === id ? { ...x, ...payload } : x));
      return mockDelay(store.find((x) => x.id === id));
    },
    remove: async (id) => {
      store = store.filter((x) => x.id !== id);
      return mockDelay({ ok: true, id });
    },
    bulkImport: async (rows) => {
      const inserted = rows.map((r, i) => ({ id: `${idPrefix}-${Date.now()}-${i}`, ativo: true, ...r }));
      store = [...inserted, ...store];
      return mockDelay({ inserted: inserted.length });
    },
  };
}

export const ICMSService = makeCRUD(mockICMS, "ICMS");
export const NCMService = makeCRUD(mockNCM, "NCM");
export const MargensService = makeCRUD(mockMargens, "MG");
export const RevestimentosService = makeCRUD(mockRevestimentos, "rev");
export const FretesService = makeCRUD(mockFretes, "FR");
export const DescontosService = makeCRUD(mockDescontos, "DS");
export const CondPagamentoService = makeCRUD(mockCondPagamento, "CP");
export const FornecedoresService = makeCRUD(mockFornecedores, "FOR");

// helpers síncronos para uso durante cálculo (evita await onde não faz sentido)
export const getNcmByCode = (ncm) => NCMService.listSync().find((n) => n.ncm === ncm);
export const getMargemByCategoria = (cat) => MargensService.listSync().find((m) => m.categoria === cat);
export const getRevestimentoByNome = (nome) => RevestimentosService.listSync().find((r) => r.nome === nome);
export const getICMSByUF = (uf) => ICMSService.listSync().find((i) => i.uf === uf);
export const getFreteByRegiao = (nome) => FretesService.listSync().find((f) => f.regiao === nome);
