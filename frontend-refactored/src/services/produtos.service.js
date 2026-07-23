import { api, mockDelay } from "./api";
import { mockProdutos } from "../mocks/data";

export const ProdutosService = {
  list: async () => mockDelay(mockProdutos),
  get: async (id) => mockDelay(mockProdutos.find((p) => p.id === id)),
  create: async (payload) => mockDelay({ id: `PRD-${Date.now()}`, ...payload }),
  update: async (id, payload) => mockDelay({ id, ...payload }),
  remove: async (id) => mockDelay({ ok: true, id }),
  importar: async (file) => mockDelay({ imported: 42, duplicated: 3, errors: 1, file: file?.name }),
};
