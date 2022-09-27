import { Header, Text, Button } from '@rneui/themed';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = ({ navigation }) => (
  <View>
    <Header
      leftComponent="Home"
      rightComponent={<Feather size={30} name="settings" />}
    />
    <Text>Home Screen</Text>
    <Button onPress={() => navigation.navigate("About")} title="About Screen" />
  </View>
);

const AboutScreen = ({ navigation }) => (
    <View>
    <Header
      leftComponent="About"
      rightComponent={<Feather size={30} name="settings" />}
    />
    <Text>About Screen</Text>
    <Button onPress={() => navigation.navigate("Home")} title="Home Screen" />
  </View>
);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
