import { useEffect } from "react";
import { View } from "react-native";
import { Text, Button } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { CustomHeader } from "../components";
import { getListingDetails } from "../redux/ListingReducer";

const HomeScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(getListingDetails());
  }, []);

  return (
    <View>
      <CustomHeader 
        navigation={navigation} 
        routeName={route.name}
      />
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("About")} title="About Screen" />
    </View>
  );
}

export default HomeScreen;
