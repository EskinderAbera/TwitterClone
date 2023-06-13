import {
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRouter, useSegments } from "expo-router";
import Tweet from "../../../../components/Tweet";
// import tweets from "../../../../assets/data/tweets";

import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { listTweets } from "../../../../lib/api/tweets";
import { useQuery } from "@tanstack/react-query";

export default function TabOneScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: listTweets,
  });

  const segment = useSegments();
  // const [tweets, setTweets] = useState<[]>([]);

  // useEffect(() => {
  //   const fetchTweets = async () => {
  //     const res = await listTweets();
  //     setTweets(res);
  //   };
  //   fetchTweets();
  // }, []);
  if (isLoading) {
    return <ActivityIndicator />;
  }

  // if (error) {
  //   return <Text>{error}</Text>;
  // }

  return (
    <>
      <FlatList data={data} renderItem={({ item }) => <Tweet tweet={item} />} />
      <Pressable
        style={styles.floatingButton}
        onPress={() => router.push("/new-tweet")}
      >
        <Entypo name="plus" size={24} color={"white"} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "#1C9BF0",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
