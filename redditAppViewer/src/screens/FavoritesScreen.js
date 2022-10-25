import { View } from "react-native";
import { Text, Button } from "@rneui/themed";
import { CustomHeader } from "../components";

const FavoritesScreen = ({ navigation, route }) => (
  <View>
    <CustomHeader 
      navigation={navigation} 
      routeName={route.name}
    />
    <Text>Favorites Screen</Text>
    <Button onPress={() => navigation.navigate("About")} title="About Screen" />
  </View>
);

export default FavoritesScreen;