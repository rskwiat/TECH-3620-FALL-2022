import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  HomeScreen,
  FavoritesScreen,
  SettingsScreen,
} from "./src/screens";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabScreen = () => (
  <Tabs.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName;
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
    headerShown: false
  })}>
    <Tabs.Screen name="Listing" component={HomeScreen} />
    <Tabs.Screen name="Favorites" component={FavoritesScreen} />
  </Tabs.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={TabScreen} />
        <Stack.Screen name="About" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
