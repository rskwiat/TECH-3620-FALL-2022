import { View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { Theme } from "../utils/constants";

const Loading = () => (
  <View style={styles.container}>
    <Feather name="loader" size={Theme.iconSize} />
    <Text h4 h4Style={styles.h4}>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  h4: {
    flex: 1,
    marginTop: 20,
  }
})

export default Loading;
