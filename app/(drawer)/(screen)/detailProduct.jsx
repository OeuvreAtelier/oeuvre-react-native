import React from "react";
import { View, Text, ScrollView, StyleSheet, Button, Image, SafeAreaView } from "react-native";

const DetailProduct = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <Image source={{ uri: "https://via.placeholder.com/300" }} style={styles.image} />
        <Text style={styles.title}>Name Product</Text>
        <Text style={styles.subtitle}>Category</Text>
        <Text style={styles.price}>Price</Text>
        <Text style={styles.description}>Detail Product</Text>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Add to Cart" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginBottom: 60, // To provide space for the footer
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

export default DetailProduct;
