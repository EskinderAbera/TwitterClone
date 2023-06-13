import { Text } from "../../../../../components/Themed";
import Tweet from "../../../../../components/Tweet";
import { useNavigation, useSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getTweet } from "../../../../../lib/api/tweets";
import { ActivityIndicator } from "react-native";

export default function TweetScreen() {
  const { id } = useSearchParams();
  const navigation = useNavigation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweet(id as string),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Tweet {id} not found!</Text>;
  }

  return <Tweet tweet={data} />;
}
