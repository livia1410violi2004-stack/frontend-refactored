import { mockDelay } from "./api";
import { mockCompras, mockFornecedores } from "../mocks/data";
export const ComprasService = {
  list: async () => mockDelay(mockCompras),
  fornecedores: async () => mockDelay(mockFornecedores),
};
