import { StyleSheet, Image, FlatList } from "react-native";
import { Text, View } from "../../components/Themed";
import Tweet from "../../components/Tweet";
import tweets from "../../assets/data/tweets";
export default function TabOneScreen() {
  return (
    <>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
      />
    </>
  );
}

const styles = StyleSheet.create({});
