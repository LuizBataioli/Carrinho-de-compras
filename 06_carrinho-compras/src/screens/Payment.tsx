import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showSuccess } from "../utils/Toast"; // Importar Toast de sucesso
import { useCartContext } from "../contexts/CartContext"; // Importar contexto do carrinho

const Payment = () => {
  const navigation = useNavigation();
  const { clearCart } = useCartContext(); // Acessar função para limpar o carrinho

  const handlePayment = () => {
    // Esvazia o carrinho e exibe mensagem de sucesso
    clearCart();
    showSuccess("Pagamento realizado com sucesso!");
    navigation.navigate("Home"); // Redireciona para a tela inicial (Home)
  };

  return (
    <View style={styles.container}>
      {/* Fundo do cartão de crédito */}
      <ImageBackground
        source={{
          uri: "https://path-to-credit-card-background-image.com/card.png",
        }} // URL ou caminho da imagem do cartão
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.label}>Número do Cartão</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0000 0000 0000 0000"
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Validade</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="MM/AA"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="123"
              secureTextEntry
            />
          </View>
        </View>
      </ImageBackground>

      {/* Botão de Finalizar Pagamento */}
      <Button
        title="Finalizar Pagamento"
        onPress={handlePayment}
        color="#28a745"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  cardBackground: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "#333",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#ffffff99",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 0.45,
  },
});

export default Payment;
