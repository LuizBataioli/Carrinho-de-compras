import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ProductDTO } from "../types/Product";
import { RootStackParamList } from "../types/Types"; // Certifique-se de que isso esteja importado corretamente

const ProductList = () => {
  const [data, setData] = useState<ProductDTO[]>([]); // Tipagem correta do estado
  const [loading, setLoading] = useState(true);

  // Tipar a navegação
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchData = async () => {
    try {
      const response = await axios.get<ProductDTO[]>(
        "https://fakestoreapi.com/products"
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => {
            // Navega para a tela de detalhes, passando o produto como parâmetro
            navigation.navigate("Details", { product: item });
          }}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "green",
  },
});

export default ProductList;
