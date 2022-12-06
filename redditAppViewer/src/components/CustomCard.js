import { Image, TouchableOpacity, View } from "react-native";
import { Text, Button, Card } from "@rneui/themed";
import { Theme } from "../utils/constants";
const CustomCard = ({
  author,
  title,
  thumbnail,
  isFavorite,
  onImagePress,
  onButtonPress,
  darkMode
}) => {
  return (
    <Card containerStyle={{ backgroundColor: darkMode ? Theme.colors.black : Theme.colors.white }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => onImagePress()}>
          <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: thumbnail }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", width: 150, marginLeft: 20 }}>
          <Text style={{
            color: darkMode ? Theme.colors.white : Theme.colors.black,
            fontWeight: "bold",
            marginBottom: 10
          }}>{title}</Text>
          <Text style={{ color: darkMode ? Theme.colors.white : Theme.colors.black }}>{author}</Text>
          <Button
            icon={{
              name: isFavorite ? 'trash' : 'heart',
              type: 'feather',
              size: 24,
              color: 'white',
            }}
            buttonStyle={{ marginTop: 20 }}
            color={isFavorite ? "error" : ""}
            onPress={() => onButtonPress()}
          />
        </View>
      </View>
    </Card>
  );
}

export default CustomCard;