import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { showSuccess, showError } from "../utils/Toast";
import { useCartContext } from "../contexts/CartContext";

const screenWidth = Dimensions.get("window").width;

const Payment = ({ navigation }: { navigation: any }) => {
  const { clearCart } = useCartContext();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Função para formatar número do cartão com espaços a cada 4 dígitos
  const handleCardNumberChange = (text: string) => {
    const formatted = text
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .slice(0, 16) // Limita a 16 dígitos
      .replace(/(\d{4})(?=\d)/g, "$1 "); // Adiciona espaço a cada 4 dígitos
    setCardNumber(formatted);
  };

  // Função para formatar a data de validade no formato MM/AA
  const handleExpiryDateChange = (text: string) => {
    const formatted = text
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .slice(0, 4) // Limita a 4 dígitos (MMYY)
      .replace(/(\d{2})(?=\d)/, "$1/"); // Adiciona uma barra após os 2 primeiros dígitos
    setExpiryDate(formatted);
  };

  // Função para limitar o CVV a 3 dígitos
  const handleCvvChange = (text: string) => {
    setCvv(text.replace(/\D/g, "").slice(0, 3));
  };

  const handleCheckout = () => {
    if (
      !address ||
      !city ||
      !state ||
      cardNumber.length < 19 || // 16 dígitos + 3 espaços
      !cardHolderName ||
      expiryDate.length < 5 || // formato MM/AA
      cvv.length < 3
    ) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    showSuccess("Compra finalizada com sucesso!");
    clearCart();
    navigation.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pagamento e Entrega</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Endereço de entrega:</Text>
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.cityInput]}
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={[styles.input, styles.stateInput]}
            placeholder="Estado"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Dados de pagamento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Número do cartão"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          keyboardType="numeric"
          maxLength={19} // Limita o campo a 19 caracteres
        />
        <TextInput
          style={styles.input}
          placeholder="Nome do titular"
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.expiryInput]}
            placeholder="Data de validade (MM/AA)"
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
            keyboardType="numeric"
            maxLength={5} // Limita o campo a 5 caracteres
          />
          <TextInput
            style={[styles.input, styles.cvvInput]}
            placeholder="CVV"
            value={cvv}
            onChangeText={handleCvvChange}
            keyboardType="numeric"
            maxLength={3} // Limita o campo a 3 caracteres
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardNumber}>
          {cardNumber || "**** **** **** ****"}
        </Text>
        <Text style={styles.cardName}>
          {cardHolderName || "NOME DO TITULAR"}
        </Text>
        <View style={styles.cardRow}>
          <Text style={styles.cardExpiry}>{expiryDate || "MM/AA"}</Text>
          <Text style={styles.cardCvv}>{cvv || "CVV"}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Finalizar pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    color: "#333",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityInput: {
    flex: 2,
    marginRight: 8,
  },
  stateInput: {
    flex: 1,
  },
  expiryInput: {
    flex: 2,
    marginRight: 8,
  },
  cvvInput: {
    flex: 1,
  },
  card: {
    width: screenWidth * 0.9,
    height: (screenWidth * 0.9) / 1.59,
    backgroundColor: "#4b0082",
    borderRadius: 12,
    padding: 20,
    justifyContent: "space-between",
    marginVertical: 16,
  },
  cardNumber: {
    fontSize: 18,
    color: "#fff",
    letterSpacing: 2,
  },
  cardName: {
    fontSize: 16,
    color: "#fff",
    marginTop: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardExpiry: {
    fontSize: 14,
    color: "#fff",
  },
  cardCvv: {
    fontSize: 14,
    color: "#fff",
  },
  button: {
    backgroundColor: "#6a0dad",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});