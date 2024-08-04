import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddressByUserId } from '../../../redux/features/addressSlice';
import { addToCart, clearCart, removeFromCart, selectCartItems } from '../../../redux/features/cartSlice';
import { createTransaction } from '../../../redux/features/transactionSlice';
import { RadioButton } from 'react-native-paper';
import { fetchProduct } from '../../../redux/features/productSlice';

const Payment = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const address = useSelector((state) => state.address.data);
  const user = useSelector((state) => state.user.data);
  const cartItems = useSelector(selectCartItems);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [redirect, setRedirectUrl] = useState(null);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchAddressByUserId(user.id));
      setFormData({
        userId: user.id,
        addressId: selectedAddress,
        transactionDetails: [],
      });
    } else {
      router.push('discover');
    }
  }, [dispatch, user.id, selectedAddress]);

  const handleRadioChange = (addressId) => {
    setSelectedAddress(addressId);
    setFormData({
      ...formData,
      addressId: addressId,
    });
  };

  const processPayment = async (token, redirectUrl) => {
    setLoading(true);
    setModalVisible(true);
    setPaymentSuccess(false);

    try {
      setTimeout(async () => {
        setLoading(false);
        setPaymentSuccess(true);

        // Simulate a successful payment response
        const paymentResponse = { success: true };

        if (paymentResponse.success) {
          console.log("Payment successful:", paymentResponse);
          dispatch(clearCart());
          dispatch(fetchProduct());
        } else {
          throw new Error("Payment processing failed");
        }
      }, 2000);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("Processing transaction:", formData);

    try {
      const action = createTransaction(formData);
      const transactionResponse = await dispatch(action).unwrap();
      console.log("Transaction response:", transactionResponse);

      const token = transactionResponse.data.payment.token;
      const redirectUrl = transactionResponse.data.payment.redirectUrl;
      if (!token) {
        throw new Error("Error getting token!");
      }

      setRedirectUrl(redirectUrl)
      processPayment(token);
    } catch (error) {
      console.error("Error creating transaction!", error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Transaction Error',
        text2: 'An error occurred while creating the transaction.',
      });
    }
  };

  const numberWithDots = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const addToTransactionDetails = (item) => {
    const isItemInDetails = formData.transactionDetails.find(
      (detail) => detail.productId === item.id
    );

    if (isItemInDetails) {
      dispatch(addToCart(item));
      setFormData({
        ...formData,
        transactionDetails: formData.transactionDetails.map((detail) =>
          detail.productId === item.id
            ? { ...detail, quantity: detail.quantity + 1 }
            : detail
        ),
      });
    } else {
      setFormData({
        ...formData,
        transactionDetails: [
          ...formData.transactionDetails,
          { productId: item.id, quantity: 1 },
        ],
      });
    }
  };

  const removeFromTransactionDetails = (item) => {
    const isItemInDetails = formData.transactionDetails.find(
      (detail) => detail.productId === item.id
    );

    if (isItemInDetails) {
      dispatch(removeFromCart(item));
      setFormData({
        ...formData,
        transactionDetails: formData.transactionDetails.map((detail) =>
          detail.productId === item.id
            ? { ...detail, quantity: detail.quantity - 1 }
            : detail
        ),
      });
    } else {
      setFormData({
        ...formData,
        transactionDetails: [
          ...formData.transactionDetails,
          { productId: item.id, quantity: 1 },
        ],
      });
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setFormData({
      ...formData,
      transactionDetails: [],
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.quantity > 0) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.addressSection}>
        <Text style={styles.sectionHeading}>Shipment Address</Text>
        <View>
          {address.length === 0 ? (
            <Text style={styles.noAddress}>No address found, you can create an address in your profile page.</Text>
          ) : (
            address.map((addressItem) => (
              <View style={styles.addressItem} key={addressItem.id}>
                <RadioButton
                  value={addressItem.id}
                  status={selectedAddress === addressItem.id ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioChange(addressItem.id)}
                />
                <View style={styles.addressTextContainer}>
                  <Text style={styles.addressText}>
                    {addressItem.detail}, {addressItem.city}, {addressItem.state} {addressItem.postalCode}, {addressItem.country}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>

      <Text style={styles.heading}>My Shopping Cart</Text>
      <View style={styles.cartContainer}>
        <View style={styles.cartItems}>
          {cartItems.map((item) => (
            <View style={styles.cartItem} key={item.id}>
              <View>
                <Text style={styles.displayName}>{item.user.displayName}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemStock}>Available stock: {item.stock}</Text>
                <Text style={styles.itemPrice}>Price per item: Rp{numberWithDots(item.price)}</Text>
              </View>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.button} onPress={() => removeFromTransactionDetails(item)}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{item.quantity}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { if (item.quantity < item.stock) addToTransactionDetails(item) }}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {cartItems.length > 0 ? (
            <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
              <Text style={styles.clearCartButtonText}>Clear Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartTitle}>No products yet...</Text>
              <Text style={styles.emptyCartMiddleText}>
                You should add the products you really wanted to the cart first, because one day this product will be missing sooner or later!
              </Text>
              <Text style={styles.emptyCartLowerText}>
                You will get your desired product after you pay and the item is shipped.
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.paymentSection}>
        <Text style={styles.sectionHeading}>Payment Details</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Payment Method</Text>
          <Text style={styles.paymentValue}>Midtrans</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>Rp{numberWithDots(getCartTotal())}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
          <Ionicons name="card" size={24} color="white" />
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#4b0082" />
            ) : paymentSuccess ? (
              <View style={styles.successContainer}>
                <Ionicons name="checkmark-circle" size={80} color="#4b0082" />
                <Text style={styles.modalText}>Confirmation Purchase Success</Text>
                <Text style={styles.modalText}>Continue payment, please go to the transaction page</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    router.push('/transaction');
                  }}
                >
                  <Text style={styles.modalButtonText}>Go to Transactions</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.successContainer}>
                <ActivityIndicator size="large" color="#4b0082" />
                <Text style={styles.modalText}>Processing Payment...</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  cartContainer: {
    marginHorizontal: 10,
  },
  cartItems: {
    width: '100%',
    paddingStart: 4,
    paddingEnd: 5,
  },
  cartItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 14,
    fontWeight: '400',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  itemStock: {
    fontSize: 14,
    color: '#888',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 14,
  },
  clearCartButton: {
    marginTop: 20,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
  },
  clearCartButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  emptyCart: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyCartTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  emptyCartMiddleText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  emptyCartLowerText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  addressSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    width: '100%',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
  },
  noAddress: {
    color: '#fff',
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressTextContainer: {
    flexShrink: 1,
    flex: 1,
    marginLeft: 10,
  },
  addressText: {
    fontSize: 14,
    flexShrink: 1,
  },
  paymentSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  paymentLabel: {
    fontSize: 16,
    color: '#888',
  },
  paymentValue: {
    fontSize: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b0082',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#4b0082',
    padding: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Payment;
