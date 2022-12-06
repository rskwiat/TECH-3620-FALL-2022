import { useColorScheme } from "react-native";
import { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Text } from "@rneui/themed";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store";
import { setDarkMode } from "./src/redux/SettingsReducer";
import { Theme } from "./src/utils/constants";

import {
  HomeScreen,
  FavoritesScreen,
  SettingsScreen,
} from "./src/screens";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabScreen = () => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (color === "#8E8E8F") {
            color = darkMode ? Theme.colors.white : Theme.colors.black;
          }

          if (route.name === "Listing") {
            iconName = "home";
          }

          if (route.name === "Favorites") {
            iconName = "heart";
          }

          return (
            <Feather
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        headerShown: false,
        tabBarLabelStyle: {
          color: darkMode ? Theme.colors.white : Theme.colors.black,
        },
      })}>
      <Tabs.Screen name="Listing" component={HomeScreen} />
      <Tabs.Screen name="Favorites" component={FavoritesScreen} />
    </Tabs.Navigator>
  );
}

const App = () => {
  const dispatch = useDispatch();
  const theme = useColorScheme();

  useEffect(() => {
    dispatch(setDarkMode(theme === "dark" ? true : false));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={TabScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};
