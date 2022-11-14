import { Header, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Theme } from "../utils/constants";

const CustomHeader = ({ navigation, routeName }) => {
  const { darkMode } = useSelector(state => state.settings);

  const onNavigate = (name) => {
    navigation.navigate(name);
  }

  const renderHomeIcon = () => {
    if (routeName === "Settings") {
      return (
        <Feather
          size={Theme.iconSize}
          name="home"
          color={darkMode ? Theme.colors.white : Theme.colors.black}
          onPress={() => onNavigate("Home")}
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
          color={darkMode ? Theme.colors.white : Theme.colors.black}
          name="settings"
          onPress={() => onNavigate("Settings")}
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