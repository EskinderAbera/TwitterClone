import { StyleSheet, FlatList, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import Tweet from "../../../components/Tweet";
import tweets from "../../../assets/data/tweets";
import { Entypo } from "@expo/vector-icons";

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
      />
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
