import { mockDelay } from "./api";
import { mockRevestimentos } from "../mocks/data";

let store = [...mockRevestimentos];

export const RevestimentosService = {
  list: async () => mockDelay([...store]),
  get: async (id) => mockDelay(store.find((x) => x.id === id)),
  create: async (payload) => {
    const item = { id: `rev-${Date.now()}`, margem: 0, ...payload };
    store = [...store, item];
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

export const getRevestimentosSync = () => store;
