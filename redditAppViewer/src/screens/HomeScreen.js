import { useEffect, useState } from "react";
import { View, ScrollView, useColorScheme } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { CustomHeader, Loading, CardItem, CustomOverlay } from "../components";
import { getListingDetails } from "../redux/ListingReducer";
import { setDarkMode } from "../redux/SettingsReducer";
import { PLACEHOLDER_IMAGE, Theme } from "../utils/constants";

const HomeScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { response, isLoading, selected } = useSelector((state) => state.listing);
  const { darkMode } = useSelector((state) => state.settings);

  const mode = useColorScheme();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const defaultView = (mode === "dark");
    dispatch(setDarkMode(defaultView));
  }, [mode]);

  useEffect(() => {
    if (response.data.length === 0) {
      dispatch(getListingDetails());
    }
  }, []);

  const renderCards = () => {
    return response?.data?.children.map(({ data }) => {
      const thumbnail = (data.thumbnail === "nsfw") ? PLACEHOLDER_IMAGE : data.thumbnail;

      return (
        <CardItem
          key={data.id}
          title={data.title}
          author={data.author}
          fullscreenImage={data.url_overridden_by_dest}
          thumbnail={thumbnail}
          toggleOverlay={toggleOverlay}
          favoriteData={data}
        />
      );
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
      />
      {<Loading />}
      <ScrollView style={{
        backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white,
      }}>
        {response.data.length !== 0 && renderCards()}
        <CustomOverlay
          visible={visible}
          toggleOverlay={toggleOverlay}
          selectedImage={selected}
        />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
