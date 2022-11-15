import { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Switch } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { CustomHeader, Loading } from "../components";
import { getPrivacyDetails, setDarkMode } from "../redux/SettingsReducer";
import { Theme } from "../utils/constants";

const SettingsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { response, isLoading, darkMode, isFetchError } = useSelector(state => state.settings);

  useEffect(() => {
    if (response.data.length === 0) {
      dispatch(getPrivacyDetails());
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
      />
      <ScrollView style={darkMode ? styles.darkContainer : styles.container} scrollToOverflowEnabled>
        <View style={styles.row}>
          <Text style={darkMode ? styles.darkText : ""}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={() => dispatch(setDarkMode(!darkMode))}
          />
        </View>
        {isLoading && <Loading />}
        {response && response.data.map((data) => {
          return (
            <View key={data.id} style={styles.content}>
              {/* Checks if the header object exists and renders it, fixes the empty double space row */}
              {data.header && (
                <Text h3 h3Style={darkMode ? styles.headerStyleDarkMode : styles.headerStyle}>{data.header}</Text>
              )}
              <Text style={darkMode ? styles.darkText : ""}>{data.text}</Text>
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
  darkContainer: {
    backgroundColor: Theme.colors.black,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
  },
  headerStyle: {
    paddingBottom: 10,
    color: Theme.colors.black,
  },
  headerStyleDarkMode: {
    paddingBottom: 10,
    color: Theme.colors.white,
  },
  darkText: {
    color: Theme.colors.white,
  }
});

export default SettingsScreen;
