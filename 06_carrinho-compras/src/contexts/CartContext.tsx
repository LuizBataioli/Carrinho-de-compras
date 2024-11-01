// CartContext.tsx
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICartItem, ProductDTO } from "../types/Product";
import { showError } from "../utils/Toast";

type CartContextProps = {
  cart: ICartItem[];
  getCart: () => void;
  addProduct: (product: ProductDTO) => void;
  removeProduct: (id: number) => void;
  getTotalPrice: () => number; // Adiciona função para calcular o total
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const storeCart = async (value: ICartItem[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cart", jsonValue);
    } catch (error) {
      showError("Não foi possível salvar o carrinho");
    }
  };

  const getCart = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@cart");
      const cartData = jsonValue ? JSON.parse(jsonValue) : [];
      setCart(cartData);
    } catch (error) {
      showError("Não foi possível recuperar o carrinho");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const addProduct = (product: ProductDTO) => {
    const existingProduct = cart.find(({ product: p }) => p.id === product.id);

    if (existingProduct) {
      const newCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(newCart);
      storeCart(newCart);
    } else {
      const newCart = [...cart, { product, quantity: 1 }];
      setCart(newCart);
      storeCart(newCart);
    }
  };

  const removeProduct = (id: number) => {
    const newCart = cart
      .map((item) =>
        item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(newCart);
    storeCart(newCart);
  };

  // Função para calcular o preço total do carrinho
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, getCart, addProduct, removeProduct, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
