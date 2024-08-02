import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../../components/CartItem';
import { selectCartItems, selectCartTotal, removeFromCart, updateCartItemQuantity } from '../../../redux/features/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>Cart</Text>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              product={item}
              onSelect={() => handleSelectItem(item.id)}
              onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, quantity)}
              isSelected={selectedItems.includes(item.id)}
            />
          ))
        ) : (
          <Text>Cart is empty</Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.selectAll}>
          <TouchableOpacity
            onPress={() => {
              const allSelected = selectedItems.length === cartItems.length;
              setSelectedItems(allSelected ? [] : cartItems.map((item) => item.id));
            }}
          >
            <View style={[styles.checkbox, selectedItems.length === cartItems.length && styles.checkboxSelected]} />
          </TouchableOpacity>
          <Text>All</Text>
        </View>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.price}>Rp{calculateTotal()}</Text>
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
  checkboxSelected: {
    backgroundColor: 'blue',
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
