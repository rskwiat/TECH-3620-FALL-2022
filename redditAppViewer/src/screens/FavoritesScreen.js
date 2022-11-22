import { View } from "react-native";
import { Text, Button } from "@rneui/themed";
import { CustomHeader } from "../components";
import { useDispatch, useSelector } from "react-redux";

const FavoritesScreen = ({ navigation, route }) => {
  const { favorites } = useSelector((state) => state.listing);
  return (
    <View>
      <CustomHeader
        navigation={navigation}
        routeName={route.name}
      />

      {favorites.map((favorite) => {
        return <Text key={favorite.id}>{favorite.title}</Text>
      })}
    </View>
  );
}

export default FavoritesScreen;