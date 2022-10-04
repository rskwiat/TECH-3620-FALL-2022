import { View } from "react-native";
import { Header, Text, Button } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => (
  <View>
    <Header
      leftComponent="Home"
      rightComponent={<Feather size={30} name="settings" />}
    />
    <Text>Home Screen</Text>
    <Button onPress={() => navigation.navigate("About")} title="About Screen" />
  </View>
);

export default HomeScreen;
