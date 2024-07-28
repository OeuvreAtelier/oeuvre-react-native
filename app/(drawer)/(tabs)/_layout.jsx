import { Ionicons } from "@expo/vector-icons";
import { Tabs, router, useNavigation } from "expo-router";
import React from "react";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

function CustomHeader({ headerRight, cartIcon }) {
  return (
    <View style={styles.header}>
      <SearchBar />
      {cartIcon && <View style={styles.cartIcon}>{cartIcon}</View>}
      {headerRight && <View style={styles.headerRight}>{headerRight}</View>}
    </View>
  );
}

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <Ionicons style={styles.searchIcon} name="search-outline" size={16} color="#ccc" />
      <TextInput style={styles.input} placeholder="Catalog" placeholderTextColor="#ccc" />
    </View>
  </View>
);

export default function TabsLayout() {

  function getTabBarIcon(routeName, { color, focused, size }) {
    let name;
    switch (routeName) {
      case "index":
        name = focused ? "home" : "home-outline";
        break;
      case "transaction":
        name = focused ? "wallet" : "wallet-outline";
        break;
      case "whislist":
        name = focused ? "bookmarks" : "bookmarks-outline";
        break;
      case "discovery":
        name = focused ? "compass" : "compass-outline"
      default:
        break;
    }
    return <Ionicons name={name} size={size} color="#0ea5e9" />;
  }

  const CartIcon = () => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity onPress={() => router.push('/cart')}>
        <Ionicons name="cart-outline" size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <Tabs screenOptions={({ route }) => ({
      tabBarIcon: (opt) => getTabBarIcon(route.name, opt),
    })}>
      <Tabs.Screen name="index" options={{
        header: () => <CustomHeader title="Home" cartIcon={<CartIcon />} headerRight={<DrawerToggleButton tintColor="#fff" />} />,
        title: "Home"
      }} />
      <Tabs.Screen name="discovery" options={{
        header: () => <CustomHeader title="Discovery" cartIcon={<CartIcon />} headerRight={<DrawerToggleButton tintColor="#fff" />} />,
        title: "Discovery"
      }} />
      <Tabs.Screen name="transaction" options={{
        header: () => <CustomHeader title="Transaction" cartIcon={<CartIcon />} headerRight={<DrawerToggleButton tintColor="#fff" />} />,
        title: "Transaction"
      }} />
      <Tabs.Screen name="whislist" options={{
        header: () => <CustomHeader title="Bookmarks" cartIcon={<CartIcon />} headerRight={<DrawerToggleButton tintColor="#fff" />} />,
        title: "Bookmarks"
      }} />
    </Tabs>
    
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    height: 60,
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#000',
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  cartIcon: {
    marginHorizontal: 10,
  },
  headerRight: {
    marginLeft: 0
  },
});
