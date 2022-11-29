import { Image, TouchableOpacity } from "react-native";
import { Text, Button, Card } from "@rneui/themed";

const CustomCard = ({
  author,
  title,
  thumbnail,
  isFavorite,
  onImagePress,
  onButtonPress
}) => {

  return (
    <Card>
      <TouchableOpacity onPress={() => onImagePress()}>
        <Image
          style={{ width: 250, height: 250 }}
          source={{ uri: thumbnail }}
        />
      </TouchableOpacity>
      <Text>{title}</Text>
      <Text>{author}</Text>
      <Button
        icon={{
          name: isFavorite ? 'trash' : 'heart',
          type: 'feather',
          size: 24,
          color: 'white',
        }}
        color={isFavorite ? "error" : ""}
        onPress={() => onButtonPress()}
      />
    </Card>
  );
}

export default CustomCard;