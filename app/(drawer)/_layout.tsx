import { Stack, withLayoutContext } from "expo-router";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

import { Text } from "../../components/Themed";

const DrawerNavigator = createDrawerNavigator().Navigator;

const Drawer = withLayoutContext(DrawerNavigator);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ alignSelf: "center", fontSize: 20 }}>Eskinder</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
      <Drawer.Screen name="bookmarks" options={{ title: "Bookmarks" }} />
      <Drawer.Screen name="twitter-blue" options={{ title: "Twitter Blue" }} />
    </Drawer>
  );
}
