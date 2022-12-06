import { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Switch } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { CustomHeader, Loading } from "../components";
import { getPrivacyDetails, setDarkMode } from "../redux/SettingsReducer";
import { Theme } from "../utils/constants";

const SettingsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { response, isLoading, darkMode } = useSelector(state => state.settings);

  useEffect(() => {
    if (response.data.length === 0) {
      dispatch(getPrivacyDetails());
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white }}>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
        darkMode={darkMode}
      />
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 18,
      }}>
        <Text style={{ color: darkMode ? Theme.colors.white : Theme.colors.black }}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={() => dispatch(setDarkMode(!darkMode))}
        />
      </View>
      <ScrollView style={styles.container} scrollToOverflowEnabled>
        {isLoading && <Loading />}
        {response && response.data.map((data) => {
          return (
            <View key={data.id} style={styles.content}>
              {data.header && (
                <Text h3
                  h3Style={styles.headerStyle}
                  style={{ color: darkMode ? Theme.colors.white : Theme.colors.black }}
                >{data.header}</Text>
              )}
              <Text
                style={{
                  color: darkMode ? Theme.colors.white : Theme.colors.black
                }}>
                {data.text}
              </Text>
            </View>
          );
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
