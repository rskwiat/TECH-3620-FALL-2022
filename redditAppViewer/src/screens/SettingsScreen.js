import { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { CustomHeader, Loading } from "../components";
import { getPrivacyDetails } from "../redux/SettingsReducer";

const SettingsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { response, isLoading, isFetchError } = useSelector(state => state.settings);

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
        <ScrollView style={styles.container} scrollToOverflowEnabled>
        {isLoading && <Loading />}
        {response && response.data.map((data) => {
          return (
            <View key={data.id} style={styles.content}>
              {/* Checks if the header object exists and renders it, fixes the empty double space row */}
              {data.header && (
                <Text h3 h3Style={styles.headerStyle}>{data.header}</Text>
              )}
              <Text>{data.text}</Text>
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
