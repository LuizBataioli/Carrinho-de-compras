import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useCartContext } from "../contexts/CartContext";

const Cart = () => {
  const { cart, getCart, removeProduct, getTotalPrice } = useCartContext();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.product.title}</Text>
              <Text>Quantidade: {item.quantity}</Text>
              <Text style={styles.price}>Preço: ${item.product.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeProduct(item.product.id)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: ${getTotalPrice().toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "green",
  },
  removeButton: {
    backgroundColor: "#ff6347",
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

export default Cart;
