import { View, ActivityIndicator, Animated, Easing, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { Theme } from "../utils/constants";

const Loading = () => {
  const { darkMode } = useSelector(state => state.settings);

  return (
    <View style={darkMode ? styles.darkContainer : styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    height: 200
  },
  darkContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.black,
    paddingTop: 50,
    height: 200,
  },
  loadingText: {
    flex: 1,
    marginTop: 20,
    color: Theme.colors.black,
  },
  darkLoadingText: {
    flex: 1,
    marginTop: 20,
    color: Theme.colors.white,
  }
})

export default Loading;
