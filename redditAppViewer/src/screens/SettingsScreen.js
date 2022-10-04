import { View } from "react-native";
import { Header, Text, Button } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => (
  <View>
    <Header
      leftComponent="About"
      rightComponent={<Feather size={30} name="settings" />}
    />
    <Text>Settings Screen</Text>
    <Button onPress={() => navigation.navigate("Home")} title="Home Screen" />
  </View>
);

export default SettingsScreen;
