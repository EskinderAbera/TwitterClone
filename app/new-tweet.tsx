import {
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { View, Text } from "../components/Themed";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTweet } from "../lib/api/tweets";
import { TweetType } from "../types";

const user = {
  id: "u1",
  username: "VadimNotJustDev",
  name: "Vadim",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png",
};

export default function NewTweet() {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["tweets"] });
      queryClient.setQueriesData(["tweets"], (existingTweets: unknown) => [
        ...(existingTweets as Array<TweetType>),
        data,
      ]);
    },
  });

  const onTweetPress = async () => {
    try {
      await mutateAsync({ content: text });
      setText("");
      router.back();
    } catch (error) {
      console.log("problem");
    }
  };

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        flex: 1,
      }}
    >
      <View style={styles.container} darkColor="rgba(255,255,255,0.05)">
        <View style={styles.buttonContainer}>
          <Link href={"../"} style={{ fontSize: 18 }}>
            <Text>Cancel</Text>
          </Link>
          {isLoading && <ActivityIndicator />}
          <TouchableOpacity style={styles.button} onPress={onTweetPress}>
            <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer} darkColor="rgba(255,255,255,0.05)">
          <Image source={{ uri: user.image }} style={styles.image} />
          <TextInput
            placeholder="What's happening?"
            multiline
            numberOfLines={3}
            style={{
              flex: 1,
              color: colorScheme === "dark" ? "white" : "black",
            }}
            onChangeText={setText}
            placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
          />
        </View>
        {/* {isError && <Text>Error: {error.message}</Text>} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#1C9BF0",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginRight: 10,
  },
});
