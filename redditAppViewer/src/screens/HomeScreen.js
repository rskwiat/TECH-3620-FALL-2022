import { useEffect, useState } from "react";
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, Card, Overlay } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { CustomHeader, Loading } from "../components";
import { getListingDetails, selectedImage } from "../redux/ListingReducer";
import { Theme, PLACEHOLDER_IMAGE } from "../utils/constants";

const HomeScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { response, isLoading, selected } = useSelector((state) => state.listing);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (response.data.length === 0) {
      dispatch(getListingDetails());
    }
  }, []);

  const renderCards = () => {
    return response?.data?.children.map(({ data }) => {
      const thumbnail = (data.thumbnail === "nsfw") ? PLACEHOLDER_IMAGE : data.thumbnail;

      return (
        <Card key={data.id}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                toggleOverlay();
                dispatch(selectedImage(data));
              }}
            >
              <Image 
                style={styles.image}
                source={{ uri: thumbnail }}
              />
            </TouchableOpacity>
            <View style={styles.column}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.author}>{data.author}</Text>
              <Button
                icon={{
                  name: "heart",
                  type: "feather",
                  size: Theme.iconSize,
                  color: Theme.colors.white,
                }}
                onPress={(data) => console.log(data.title)}
              />
            </View>
          </View>
        </Card>
      );
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader 
        navigation={navigation} 
        routeName={route.name}
      />
      {isLoading && <Loading />}
      <ScrollView>
        {response.data.length !== 0 && renderCards()}
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <Image 
            style={styles.largeImage} 
            source={{uri: selected.url_overridden_by_dest }}
          />
        </Overlay>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  largeImage: {
    width: 300,
    height: 300,
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column",
    width: 150,
    marginLeft: "auto"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 20,
  }
})

export default HomeScreen;
