import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { Text, Card, Overlay } from "@rneui/themed";
import { CustomHeader, CustomCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { selectImage, removeFromFavorites } from "../redux/ListingReducer";

const FavoritesScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { favorites, selectedImage } = useSelector((state) => state.listing);

  const openLargeImage = (data) => {
    setVisible(!visible);
    dispatch(selectImage(data));
  };

  const renderAddToFavorites = () => {
    if (favorites.length === 0) {
      return (
        <Card>
          <Text style={{ textAlign: "center" }}>Add some Favorites</Text>
        </Card>
      )
    }
  }

  return (
    <View>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
      />
      <ScrollView>
        {renderAddToFavorites()}
        {favorites.map((favorite) => {
          const thumbnail = (favorite.thumbnail === "nsfw") ? "https://via.placeholder.com/150" : favorite.thumbnail;

          return (
            <CustomCard
              key={favorite.id}
              author={favorite.author}
              title={favorite.title}
              thumbnail={thumbnail}
              onImagePress={() => openLargeImage(favorite)}
              onButtonPress={() => dispatch(removeFromFavorites(favorite))}
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