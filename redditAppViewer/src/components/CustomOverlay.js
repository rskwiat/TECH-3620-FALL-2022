import { StyleSheet, Image } from "react-native";
import { Overlay } from "@rneui/themed";

const CustomOverlay = ({ visible, toggleOverlay, selectedImage }) => (
  <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
    {selectedImage && <Image
      style={styles.largeImage}
      source={{ uri: selectedImage }}
    />}
  </Overlay>
);

const styles = StyleSheet.create({
  largeImage: {
    width: 300,
    height: 300,
  },
});

export default CustomOverlay;