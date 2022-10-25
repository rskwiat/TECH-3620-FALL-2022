import { Header, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Theme } from "../utils/constants";

const CustomHeader = ({ navigation, routeName }) => {
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
        />
      }
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