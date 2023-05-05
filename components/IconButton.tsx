import { View, Text } from "./Themed";
import { EvilIcons } from "@expo/vector-icons";

function IconButton(props: {
  name: React.ComponentProps<typeof EvilIcons>["name"];
  text?: number | string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      <EvilIcons size={28} {...props} />
      <Text style={{ fontSize: 12, color: "gray" }}>{props.text}</Text>
    </View>
  );
}

export default IconButton;
