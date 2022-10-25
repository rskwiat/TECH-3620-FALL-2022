import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Header, Text } from "@rneui/themed";
import { API } from "../utils/constants";
import { CustomHeader } from "../components";

const SettingsScreen = ({ navigation, route }) => {
  const [settingsData, setSettingsData] = useState();

  useEffect(() => {
    const getPrivacyDetails = async () => {
      const res = await fetch(`${API.service}/privacyPolicy`);
      const data = await res.json();
      setSettingsData(data);
    };

    getPrivacyDetails();
  }, []);

  return (
      <View style={{ flex: 1 }}>
        <CustomHeader
          navigation={navigation}
          routeName={route.name}
        />
        <ScrollView style={styles.container} scrollToOverflowEnabled>
          {settingsData?.response.map((data) => {
            return (
              <View key={data.id} style={styles.content}>
                {/* Checks if the header object exists and renders it, fixes the empty double space row */}
                {data.header && (
                  <Text h3 h3Style={styles.headerStyle}>{data.header}</Text>
                )}
                <Text>{data.text}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  content: {
    marginBottom: 20
  },
  headerStyle: {
    paddingBottom: 10
  }
});

export default SettingsScreen;
