import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CardProduct = ({ category, name, seller, price }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.image} />
      <Text>{category}</Text>
      <Text>{name}</Text>
      <Text>{seller}</Text>
      <Text>{price}</Text>
    </View>
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
