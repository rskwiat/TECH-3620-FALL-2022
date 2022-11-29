import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, Button, Card, Overlay } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { CustomHeader } from "../components";
import { getListingDetails, selectImage, addToFavorites } from "../redux/ListingReducer";

const HomeScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { response, statusCode, message, isLoading, isFetchError, errorMessage, selectedImage } = useSelector((state) => state.listing);

  const renderError = () => {
    if (typeof response.data === "string") {
      return (
        <Card>
          <Text>
            An Error Occured Loading the data, please try again later
          </Text>
        </Card>
      )
    }
  }

  useEffect(() => {
    if (response.data.length === 0) {
      dispatch(getListingDetails());
    }
  }, []);

  const openLargeImage = (data) => {
    setVisible(!visible);
    dispatch(selectImage(data));
  };

  return (
    <View>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
      />
      <ScrollView>
        {isLoading && <Text>Loading</Text>}
        {statusCode === 400 && <Text>{message}</Text>}
        {renderError()}
        {response?.data?.children?.map(({ data }) => {
          const thumbnail = (data.thumbnail === "nsfw") ? "https://via.placeholder.com/150" : data.thumbnail;

          return (
            <Card key={data.id}>
              <TouchableOpacity onPress={() => openLargeImage(data)}>
                <Image
                  style={{ width: 250, height: 250 }}
                  source={{ uri: thumbnail }}
                />
              </TouchableOpacity>
              <Text>{data.title}</Text>
              <Text>{data.author}</Text>
              <Button
                icon={{
                  name: 'heart',
                  type: 'feather',
                  size: 24,
                  color: 'white',
                }}
                onPress={() => dispatch(addToFavorites(data))}
              />
            </Card>
          );
        })}
        {selectedImage && <Overlay
          isVisible={visible}
          onBackdropPress={() => openLargeImage("")}
        >
          <Image
            style={{ width: 350, height: 350 }}
            source={{ uri: selectedImage?.url_overridden_by_dest }}
          />
        </Overlay>
        }
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
