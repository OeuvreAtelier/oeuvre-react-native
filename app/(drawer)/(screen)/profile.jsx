import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import CardProduct from "../../../components/CardProduct";

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImage} />
        </View>
        <Text style={styles.username}>Username</Text>
        <View style={styles.button}>
        <Button style={styles.button} title="Edit Profile" onPress={() => {}} />
        </View>
        <Text  style={styles.profileDetails} >Profil Detail</Text>
        <View style={styles.fbButton} >
        <Button title="Facebook" onPress={() => {}} />
        </View>
        <View style={styles.xButton} >
        <Button title="X" onPress={() => {}} />
        </View>
        <View style={styles.bestSellerContainer}>
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
  profileHeader: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
    zIndex: 1,
  },
  
  profileImage: {
    marginLeft:10,
    width: 80,
    height: 80,
    backgroundColor: "#7959e3",
    borderColor:"#f0f0f0",
    top: 110,
  },
  username: {
    backgroundColor:'#ffff',
    fontSize: 18,
    fontWeight: "bold",
    marginLeft:100,
    zIndex:2,
    position:'absolute',
    top:115,
  },
  button: {
    marginLeft: 100,
    marginTop: 5,
    width: 120,
  },
  
  profileDetails: {
    marginLeft: 10,
    justifyContent: "center",
    width: '100%',
    height:100,
    paddingTop:5,
  },
  
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  bestSellerContainer: {
    marginTop:-60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fbButton: {
    width:120,
    height:120,
  },
  xButton: {
    position:'absolute',
    top:290,
    left: 130,
    width:100,
    height:120,
  },
});

export default Profile;