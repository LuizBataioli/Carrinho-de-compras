import { RootSiblingParent } from "react-native-root-siblings";
import Routes from "./src/routes";
import React from "react";
import { UserProvider } from "./src/contexts/UserContext";
import { CartContextProvider } from "./src/contexts/CartContext"; // Importar o CartContextProvider

export default function App() {
  return (
    <RootSiblingParent>
      <CartContextProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </CartContextProvider>
    </RootSiblingParent>
  );
}
