import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCartContext } from "../contexts/CartContext";
import { ProductDTO } from "../types/Product";

type ProductDetailsRouteProp = RouteProp<
  { Details: { product: ProductDTO } },
  "Details"
>;

const ProductDetails = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const { product } = route.params;
  const { addProduct } = useCartContext();

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Preço: ${product.price}</Text>
      <Button
        title="Adicionar ao Carrinho"
        onPress={() => {
          addProduct(product);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "green",
  },
});

export default ProductDetails;
