import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const CardProduct = ({ category, name, seller, price, image, onPress }) => {


  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image src={ image || "https://ik.imagekit.io/muffincrunchy/oeuvre-images/user-picture/default_picture.jpg" } style={styles.image} />
      <Text>{category}</Text>
      <Text>{name}</Text>
      <Text>{seller}</Text>
      <Text>{price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: 100,
  },
});

export default CardProduct;
