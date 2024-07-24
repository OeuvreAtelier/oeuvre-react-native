import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Category = ({ title, iconName }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={24} color="#000" style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 90, 
    height: 50, 
    justifyContent: "center",
  },
  icon: {
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default Category;
