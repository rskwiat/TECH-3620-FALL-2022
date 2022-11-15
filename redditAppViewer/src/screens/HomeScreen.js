import { useEffect } from "react";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { Text, Button, Card } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { CustomHeader } from "../components";
import { getListingDetails } from "../redux/ListingReducer";

const HomeScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { response, isLoading, isFetchError } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(getListingDetails());
  }, []);

  return (
    <View>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
      />
      <ScrollView>
        {response?.data?.children?.map(({ data }) => {
          const thumbnail = (data.thumbnail === "nsfw") ? "https://via.placeholder.com/150" : data.thumbnail;

          return (
            <Card key={data.id}>
              <Image
                style={{ width: 250, height: 250 }}
                source={{ uri: thumbnail }}
              />
              <Text>{data.title}</Text>
              <Text>{data.author}</Text>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
