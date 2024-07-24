import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import CardProduct from "../../../components/CardProduct";

const Wishlist = () => {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.cardProductList}>
            <CardProduct category="Category" name="Product 1" seller="Seller 1" price="$100" />
            <CardProduct category="Category" name="Product 2" seller="Seller 2" price="$200" />
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  cardProductList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Wishlist;
