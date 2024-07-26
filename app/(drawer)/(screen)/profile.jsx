import React from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CardProduct from "../../../components/CardProduct";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const handlePress = (product) => {
    router.push('detailProduct', { product });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/800x200' }} style={styles.headerImage} />
      </View>
      <View style={styles.profileImageContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.displayName}>Display Name</Text>
        <Button title="Edit Profile" />
      </View>
      <Text style={styles.bio}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam ut dolores exercitationem sunt, voluptate vel voluptas quam beatae qui unde nobis molestiae aperiam repellat debitis inventore eos, nam dolorum? Exercitationem.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum assumenda, omnis, iusto asperiores, labore ducimus dolorum harum maiores et commodi quia est a eos tempora debitis illo ex repellat. Hic.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente a nobis quasi eum dolore delectus quas odit, eius omnis tempora quos corrupti nesciunt quaerat iusto animi voluptate non impedit optio.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse quidem dolorem voluptate. Maiores reiciendis corporis porro nisi, suscipit consequuntur, dolorum minima, ratione similique voluptatibus cumque culpa sed. Saepe, consequatur repellat.
      </Text>
      <View style={styles.socialButtonsContainer}>
        <View style={styles.fbButton}>
          <Button title="Facebook" onPress={() => {}} />
        </View>
        <View style={styles.xButton}>
          <Button title="X" onPress={() => {}} />
        </View>
      </View>
      <View style={styles.bestSellerContainer}>
        <CardProduct 
          category="Category" 
          name="Product 1" 
          seller="Seller 1" 
          price="$100" 
          onPress={() => handlePress({ category: 'Category', name: 'Product 1', seller: 'Seller 1', price: '$100' })}
        />
        <CardProduct 
          category="Category" 
          name="Product 2" 
          seller="Seller 2" 
          price="$200" 
          onPress={() => handlePress({ category: 'Category', name: 'Product 2', seller: 'Seller 2', price: '$200' })}
        />
        <CardProduct 
            category="Category" 
            name="Product 3" 
            seller="Seller 1" 
            price="$100" 
            onPress={() => handlePress({ category: 'Category', name: 'Product 3', seller: 'Seller 1', price: '$100' })}
          />
          <CardProduct 
            category="Category" 
            name="Product 4" 
            seller="Seller 2" 
            price="$200" 
            onPress={() => handlePress({ category: 'Category', name: 'Product 4', seller: 'Seller 2', price: '$200' })}
          />
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
  header: {
    width: '100%',
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  profileImageContainer: {
    marginTop: -50,
    marginLeft: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#fff',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  displayName: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  handle: {
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  fbButton: {
    width: 120,
  },
  xButton: {
    width: 100,
  },
  bestSellerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardProduct: {
    marginVertical: 10,
  },
});

export default Profile;
