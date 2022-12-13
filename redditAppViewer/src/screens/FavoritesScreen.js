import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Card, Overlay } from "@rneui/themed";
import { CustomHeader, CustomCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { selectImage, removeFromFavorites } from "../redux/ListingReducer";
import { PLACEHOLDER_IMAGE, Theme } from "../utils/constants";

const FavoritesScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { favorites, selectedImage } = useSelector((state) => state.listing);
  const { darkMode } = useSelector((state) => state.settings);

  const openLargeImage = (data) => {
    setVisible(!visible);
    dispatch(selectImage(data));
  };

  const renderAddToFavorites = () => {
    if (favorites.length === 0) {
      return (
        <Card>
          <Card.Title>No Favorites Saved</Card.Title>
        </Card>
      )
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white }}>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
        darkMode={darkMode}
      />
      <ScrollView>
        {renderAddToFavorites()}
        {favorites.map((favorite) => {
          const thumbnail = (favorite.thumbnail === "nsfw") ? PLACEHOLDER_IMAGE : favorite.thumbnail;

          return (
            <CustomCard
              key={favorite.id}
              author={favorite.author}
              title={favorite.title}
              thumbnail={thumbnail}
              onImagePress={() => openLargeImage(favorite)}
              onButtonPress={() => dispatch(removeFromFavorites(favorite))}
              darkMode={darkMode}
              isFavorite
            />
          )
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

export default FavoritesScreen;