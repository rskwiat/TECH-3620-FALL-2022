import { useState, useEffect } from "react";
import { View } from "react-native";
import { Header, Text, Button } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import { API } from "../utils/constants";

const SettingsScreen = ({ navigation }) => {
  const [settingsData, setSettingsData] = useState();

  useEffect(() => {
    const getPrivacyDetails = async () => {
      const res = await fetch(`${API.service}/privacyPolicy`);
      const data = await res.json();
      setSettingsData(data);
    };

    getPrivacyDetails();
  }, [])

  return (
      <View>
        <Header
          leftComponent="Settings"
          rightComponent={<Feather size={30} name="settings" />}
        />
        <Text>{settingsData?.statusCode}</Text>
      </View>
    );
  }

export default SettingsScreen;
