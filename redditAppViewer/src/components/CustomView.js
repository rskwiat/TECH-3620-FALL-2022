import { View } from "react-native";
import { Theme } from "../utils/constants";

const CustomView = ({ darkMode, children }) => {
  <View style={{ flex: 1, backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white }}>
    {children}
  </View>
};

export default CustomView;