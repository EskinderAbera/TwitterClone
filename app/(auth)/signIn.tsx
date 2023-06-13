import { useState } from "react";
import { Text, View } from "../../components/Themed";
import { Pressable, TextInput, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../lib/api/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: login,
  });

  const onSignIn = async () => {
    try {
      await mutateAsync({ email });
      router.push({ pathname: "/authenticate", params: { email } });
    } catch (error) {
      Alert.alert("error occured");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sign in or create an account</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Pressable style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Sign in</Text>
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
