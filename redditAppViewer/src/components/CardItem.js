import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Card, Button, Text } from "@rneui/themed";
import { Theme } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectedImage, addToFavorites, removeFromFavorites } from "../redux/ListingReducer";

const CardItem = ({ title, author, thumbnail, fullscreenImage, toggleOverlay, favoriteData, clickToDelete }) => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(state => state.settings);

  const ButtonOnPress = () => {
    if (clickToDelete) {
      dispatch(removeFromFavorites(favoriteData));
    } else {
      dispatch(addToFavorites(favoriteData));
    }
  }

  return (
    <Card
      containerStyle={{
        backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white,
      }}
    >
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
          <Text style={darkMode ? styles.titleDarkMode : styles.title}>{title}</Text>
          <Text style={darkMode ? styles.authorDarkMode : styles.author}>{author}</Text>
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
    color: Theme.colors.black,
  },
  titleDarkMode: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Theme.colors.white,
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 20,
    color: Theme.colors.black,
  },
  authorDarkMode: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 20,
    color: Theme.colors.white,
  },
});

export default CardItem;