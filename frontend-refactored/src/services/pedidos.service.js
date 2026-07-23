import { mockDelay } from "./api";
import { mockPedidos } from "../mocks/data";
export const PedidosService = { list: async () => mockDelay(mockPedidos) };
