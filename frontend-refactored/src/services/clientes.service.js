import { api, mockDelay } from "./api";
import { mockClientes } from "../mocks/data";

// Ready for future FastAPI endpoints - just swap the mockDelay for api calls.
export const ClientesService = {
  list: async () => mockDelay(mockClientes),
  // list: async () => (await api.get("/clientes")).data,
  get: async (id) => mockDelay(mockClientes.find((c) => c.id === id)),
  create: async (payload) => mockDelay({ id: `CLI-${Date.now()}`, ...payload }),
  update: async (id, payload) => mockDelay({ id, ...payload }),
  remove: async (id) => mockDelay({ ok: true, id }),
};
