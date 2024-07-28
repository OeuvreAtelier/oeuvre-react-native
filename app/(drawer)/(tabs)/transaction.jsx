import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Product from "../../../components/Product";
import { router } from "expo-router";

const Transaction = () => {

    const handlePress = (product) => {
        router.push('detailProduct', { product });
    };

  return (
    <ScrollView style={styles.container}>
      <Product name="Product 1" quantity="2" price="$100" 
      onPress={() => handlePress({ name: 'Product 1', quantity: '2', price: '$100' })}/>
      <Product name="Product 2" quantity="1" price="$200"
      onPress={() => handlePress({ name: 'Product 2', quantity: '1', price: '$200' })}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
});

export default Transaction;