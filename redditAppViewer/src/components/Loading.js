import { View, ActivityIndicator } from "react-native";
import { Theme } from "../utils/constants";

const Loading = ({ darkMode }) => (
  <View style={{ flex: 1, marginVertical: 30, backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white }}>
    <ActivityIndicator size="large" />
  </View>
);

export default Loading;
