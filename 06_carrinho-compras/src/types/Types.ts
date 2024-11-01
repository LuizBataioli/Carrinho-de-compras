import { ProductDTO } from "./Product"; // Ajuste o caminho para seu arquivo de tipos de produto

export type RootStackParamList = {
  Product: undefined; // Rota de lista de produtos não precisa de parâmetros
  Details: { product: ProductDTO }; // Rota de detalhes espera um produto
  Cart: undefined;
  Payment: undefined;
  OrderStatus: undefined;
  UserInfo: undefined;
};
