import { Header, Text } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { Theme } from "../utils/constants";

const CustomHeader = ({ navigation, routeName, darkMode }) => {
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
          color={darkMode ? Theme.colors.white : Theme.colors.black}
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
          style={{
            color: darkMode ? Theme.colors.white : Theme.colors.black,
            fontSize: 18,
          }}
        >
          {routeName}
        </Text>
      }
      rightComponent={
        <Feather
          size={Theme.iconSize}
          name="settings"
          onPress={() => onNavigate("Settings")}
          color={darkMode ? Theme.colors.white : Theme.colors.black}
        />
      }
      backgroundColor={darkMode ? Theme.colors.black : ""}
    />
  );
}

export default CustomHeader;