import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Product = ({ name, quantity, price, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: "https://via.placeholder.com/50" }} style={styles.image} />
      <View style={styles.details}>
        <Text>{name}</Text>
        <Text>{quantity}</Text>
        <Text>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
  details: {
    marginLeft: 10,
  },
});

export default Product;