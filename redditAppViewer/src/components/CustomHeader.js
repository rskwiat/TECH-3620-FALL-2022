import { Header, Text } from "@rneui/themed";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Theme } from "../utils/constants";

const CustomHeader = ({ navigation, routeName }) => {
  const { darkMode } = useSelector((state) => state.settings);

  const onNavigate = (name) => {
    navigation.navigate(name);
  }

  const renderHomeIcon = () => {
    if (routeName === "Settings") {
      return (
        <Feather
          size={Theme.iconSize}
          name="home"
          onPress={() => onNavigate("Home")}
          color={darkMode ? Theme.colors.white : ""}
        />
      );
    }
    return null;
  }

  return (
    <Header
      leftComponent={renderHomeIcon()}
      placement="left"
      centerComponent={
        <Text
          style={styles.headerText}
        >
          {routeName}
        </Text>
      }
      rightComponent={
        <Feather
          size={Theme.iconSize}
          name="settings"
          onPress={() => onNavigate("Settings")}
          color={darkMode ? Theme.colors.white : ""}
        />
      }
      backgroundColor={darkMode ? Theme.colors.black : ""}
    />
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: Theme.colors.white,
    fontSize: 18,
  },
})

export default CustomHeader;