import { useEffect, useState } from "react";
import { ScrollView, Image } from "react-native";
import { Text, Card, Overlay } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";

import { CustomHeader, CustomCard, Loading, CustomView } from "../components";
import { getListingDetails, selectImage, addToFavorites } from "../redux/ListingReducer";
import { PLACEHOLDER_IMAGE } from "../utils/constants";
const HomeScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { response, statusCode, message, isLoading, selectedImage } = useSelector((state) => state.listing);
  const { darkMode } = useSelector((state) => state.settings);

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
    <CustomView darkMode={darkMode}>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
        darkMode={darkMode}
      />
      <ScrollView>
        {isLoading && <Loading darkMode={darkMode} />}
        {statusCode === 400 && <Text>{message}</Text>}
        {renderError()}
        {response?.data?.children?.map(({ data }) => {
          const thumbnail = (data.thumbnail === "nsfw") ? PLACEHOLDER_IMAGE : data.thumbnail;

          return (
            <CustomCard
              key={data.id}
              author={data.author}
              title={data.title}
              thumbnail={thumbnail}
              onImagePress={() => openLargeImage(data)}
              onButtonPress={() => dispatch(addToFavorites(data))}
              darkMode={darkMode}
            />
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
    </CustomView>
  );
}

export default HomeScreen;
