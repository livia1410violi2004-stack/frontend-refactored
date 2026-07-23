import { mockDelay } from "./api";
import { mockImpostos } from "../mocks/data";

// Store em memória para simular CRUD com persistência de sessão
let store = [...mockImpostos];

export const ImpostosService = {
  list: async () => mockDelay([...store]),
  get: async (id) => mockDelay(store.find((x) => x.id === id)),
  create: async (payload) => {
    const item = { id: `TAX-${Date.now()}`, ativo: true, ...payload };
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
};
