import { useState } from "react";
import { Text, View } from "../../components/Themed";
import { Pressable, TextInput, StyleSheet } from "react-native";
import { useSearchParams } from "expo-router";

export default function Authenticate() {
  const [code, setCode] = useState("");

  const { email } = useSearchParams();

  const onConfirm = async () => {
    console.warn("Authenticate", email, code);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Confirm your email</Text>
      <TextInput
        placeholder="Confirm code"
        style={styles.input}
        value={code}
        onChangeText={setCode}
      />

      <Pressable style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  label: {
    fontSize: 24,
    marginVertical: 5,
    color: "gray",
  },
  error: {
    marginVertical: 5,
    color: "red",
  },
  input: {
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    fontSize: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#050A12",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});