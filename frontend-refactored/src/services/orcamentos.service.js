import { api, mockDelay } from "./api";
import { mockOrcamentos } from "../mocks/data";

export const OrcamentosService = {
  list: async () => mockDelay(mockOrcamentos),
  get: async (id) => mockDelay(mockOrcamentos.find((o) => o.id === id)),
  create: async (payload) => mockDelay({ id: `ORC-${Date.now()}`, ...payload }),
};
