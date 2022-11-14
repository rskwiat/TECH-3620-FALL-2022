import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Card, Button, Text } from "@rneui/themed";
import { Theme } from "../utils/constants";
import { useDispatch } from "react-redux";
import { selectedImage, addToFavorites, removeFromFavorites } from "../redux/ListingReducer";

const CardItem = ({ title, author, thumbnail, fullscreenImage, toggleOverlay, favoriteData, clickToDelete }) => {
  const dispatch = useDispatch();

  const ButtonOnPress = () => {
    if (clickToDelete) {
      dispatch(removeFromFavorites(favoriteData));
    } else {
      dispatch(addToFavorites(favoriteData));
    }
  }

  return (
    <Card>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            toggleOverlay();
            dispatch(selectedImage(fullscreenImage));
          }}
        >
          <Image
            style={styles.image}
            source={{ uri: thumbnail }}
          />
        </TouchableOpacity>
        <View style={styles.column}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
          <Button
            icon={{
              name: clickToDelete ? "trash" : "heart",
              type: "feather",
              size: Theme.iconSize,
              color: Theme.colors.white,
            }}
            color={clickToDelete ? "warning" : ""}
            onPress={ButtonOnPress}
          />
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
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
  },
});

export default CardItem;