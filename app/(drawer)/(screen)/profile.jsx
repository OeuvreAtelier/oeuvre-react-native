import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CardProduct from "../../../components/CardProduct";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const [isCustomer, setIsCustomer] = useState(true); 

  // Sample profile data
  const profileData = {
    firstName: 'Ferdy',
    lastName: 'Fermadi',
    displayName: 'Apeng',
    email: 'ferdy.fermadi99@gmail.com',
    gender: 'Man',
    birthdate: '09/09/1998',
    phoneNumber: '081234567890'
  };

  const handlePress = (product) => {
    router.push('detailProduct', { product });
  };

  const toggleProfileMode = () => {
    setIsCustomer(prevState => !prevState); 
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
        <Text style={styles.displayName}>{profileData.displayName}</Text>
        <Button title="Edit Profile" onPress={toggleProfileMode} />
      </View>

      {isCustomer ? (
        <View style={styles.profileDetailsContainer}>
          <View style={styles.profileDetails}>
            <Text style={styles.sectionTitle}>Data Diri</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>First Name:</Text>
                <Text style={styles.tableData}>{profileData.firstName}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Last Name:</Text>
                <Text style={styles.tableData}>{profileData.lastName}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Display Name:</Text>
                <Text style={styles.tableData}>{profileData.displayName}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Gender:</Text>
                <Text style={styles.tableData}>{profileData.gender}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Birthdate:</Text>
                <Text style={styles.tableData}>{profileData.birthdate}</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Kontak</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Email:</Text>
                <Text style={styles.tableData}>{profileData.email}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Phone Number:</Text>
                <Text style={styles.tableData}>{profileData.phoneNumber}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.bio}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam ut dolores exercitationem sunt, voluptate vel voluptas quam beatae qui unde nobis molestiae aperiam repellat debitis inventore eos, nam dolorum? Exercitationem.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum assumenda, omnis, iusto asperiores, labore ducimus dolorum harum maiores et commodi quia est a eos tempora debitis illo ex repellat. Hic.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente a nobis quasi eum dolore delectus quas odit, eius omnis tempora quos corrupti nesciunt quaerat iusto animi voluptate non impedit optio.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse quidem dolorem voluptate. Maiores reiciendis corporis porro nisi, suscipit consequuntur, dolorum minima, ratione similique voluptatibus cumque culpa sed. Saepe, consequatur repellat.
          </Text>
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
        </>
      )}
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
    marginLeft: 10,
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
  profileDetailsContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  profileDetails: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tableData: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
    color: '#000',
  },
  bio: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20,
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
