import { Header, Text } from '@rneui/themed';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";

const App = () => {
  return (
    <SafeAreaProvider>
      <View>
        <Header
          leftComponent="Reddit Viewer"
          rightComponent={<Feather size={30} name="settings" />}
        />
        <Text>Hello</Text>
      </View>
    </SafeAreaProvider>
  );
}

export default App;
