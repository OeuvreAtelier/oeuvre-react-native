// screens/CartScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CartItem from '../../../components/CartItem';
import CardProduct from '../../../components/CardProduct';
import { router } from 'expo-router';

const cartItems = [
  { id: '1', name: 'Product 1', price: 'Rp120.000', image: 'https://via.placeholder.com/50' },
];

const recommendations = [
  { id: '1', category: 'Category', name: 'Product 1', seller: 'Seller', price: 'Rp120.000', image: 'https://via.placeholder.com/100' },
  { id: '2', category: 'Category', name: 'Product 2', seller: 'Seller', price: 'Rp120.000', image: 'https://via.placeholder.com/100' },
  { id: '3', category: 'Category', name: 'Product 3', seller: 'Seller', price: 'Rp120.000', image: 'https://via.placeholder.com/100' },
  { id: '4', category: 'Category', name: 'Product 4', seller: 'Seller', price: 'Rp120.000', image: 'https://via.placeholder.com/100' },
];

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>Cart</Text>
        {cartItems.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
        <Text style={styles.heading}>Rekomendasi</Text>
        <View style={styles.recommendationsContainer}>
          {recommendations.map((item) => (
            <CardProduct category="Category" name="Product 1" seller="Seller 1" price="$100" />
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.selectAll}>
          <View style={styles.checkbox} />
          <Text>All</Text>
        </View>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.price}>Rp120.000</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  recommendationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  total: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
