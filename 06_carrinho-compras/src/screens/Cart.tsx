import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import React from "react";
import { useCartContext } from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const { cart, removeProduct } = useCartContext();
  const navigation = useNavigation();

  // Calcula o valor total
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Carrinho</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.productTitle}>{item.product.title}</Text>
              <Text>Quantidade: {item.quantity}</Text>
              <Text>
                Preço: R$ {(item.product.price * item.quantity).toFixed(2)}
              </Text>
              <Button
                title="Remover"
                color="#cc0000"
                onPress={() => removeProduct(item.product.id)}
              />
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R$ {totalAmount.toFixed(2)}</Text>
      <Button
        title="Finalizar Compra"
        onPress={() => navigation.navigate("Payment")}
        color="#28a745"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginVertical: 20,
    textAlign: "center",
  },
});

export default Cart;
