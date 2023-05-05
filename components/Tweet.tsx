import { Image, StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import { TweetType } from "../types";
import { Entypo } from "@expo/vector-icons";
import IconButton from "./IconButton";

type TweetProps = {
  tweet: TweetType;
};

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: tweet.user.image }} style={styles.userImage} />
      <View style={styles.mainContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.name}>{tweet.user.name}</Text>
          <Text style={styles.username}>{tweet.user.username} • 2h</Text>
          <Entypo
            name="dots-three-horizontal"
            size={16}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </View>
        <Text style={styles.content} numberOfLines={4}>
          {tweet.content}
        </Text>

        {tweet.image && (
          <Image source={{ uri: tweet.image }} style={styles.image} />
        )}

        <View style={styles.footer}>
          <IconButton name="comment" text={tweet.numberOfComments} />
          <IconButton name="retweet" text={tweet.numberOfRetweets} />
          <IconButton name="heart" text={tweet.numberOfLikes} />
          <IconButton name="chart" text={tweet.impressions ?? 0} />
          <IconButton name="share-apple" />
        </View>
      </View>
    </View>
  );
};

export default Tweet;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "lightgray",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: "600",
  },
  username: {
    color: "gray",
    marginLeft: 5,
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },
  footer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
  },
});
