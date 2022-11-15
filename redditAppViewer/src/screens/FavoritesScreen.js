import { useState } from "react";
import { View, ScrollView } from "react-native";
import { Card } from "@rneui/themed";
import { useSelector } from "react-redux";

import { CustomHeader, CardItem, CustomOverlay } from "../components";
import { PLACEHOLDER_IMAGE, Theme } from "../utils/constants";

const FavoritesScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const { selected, favorites } = useSelector((state) => state.listing);
  const { darkMode } = useSelector((state) => state.settings);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const renderCards = () => {
    return favorites?.map((data) => {
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
          clickToDelete
        />
      );
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
      />
      <ScrollView style={{
        backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white,
      }}>
        {favorites.length > 0 ? renderCards() : <Card><Card.Title>No Favorites Saved</Card.Title></Card>}
        <CustomOverlay
          visible={visible}
          toggleOverlay={toggleOverlay}
          selectedImage={selected}
        />
      </ScrollView>
    </View>
  );
}

export default FavoritesScreen;
