import { Text } from "../../components/Themed";
import Tweet from "../../components/Tweet";
import tweets from "../../assets/data/tweets";
import { useNavigation, useSearchParams } from "expo-router";

export default function TweetScreen() {
  const { id } = useSearchParams();
  const navigation = useNavigation();

  const tweet = tweets.find((t) => t.id === id);

  if (!tweet) {
    return <Text>Tweet {id} not found!</Text>;
  }
  return <Tweet tweet={tweet} />;
}
