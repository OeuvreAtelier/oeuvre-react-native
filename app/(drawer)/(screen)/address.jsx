import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { fetchAddressByUserId, deleteAddress } from '../../../redux/features/addressSlice';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddressScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const addresses = useSelector((state) => state.address.data);
  const userId = useSelector((state) => state.user.data.id);

  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAddressByUserId(userId)).unwrap();
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    };

    fetchData();
  }, [dispatch, userId]);

  useEffect(() => {
    const loadSelectedAddress = async () => {
      try {
        const savedAddressId = await AsyncStorage.getItem('selectedAddress');
        if (savedAddressId) {
          setSelectedAddress(savedAddressId);
        }
      } catch (error) {
        console.error('Failed to load selected address:', error);
      }
    };

    loadSelectedAddress();
  }, []);

  useEffect(() => {
    const saveSelectedAddress = async () => {
      try {
        if (selectedAddress) {
          await AsyncStorage.setItem('selectedAddress', selectedAddress);
        } else {
          await AsyncStorage.removeItem('selectedAddress');
        }
      } catch (error) {
        console.error('Failed to save selected address:', error);
      }
    };

    saveSelectedAddress();
  }, [selectedAddress]);

  const handleEditAddress = (address) => {
    router.push({ pathname: 'addressForm', params: address });
  };

  const handleAdd = () => {
    router.push({
      pathname: 'addressForm',
      params: { state: JSON.stringify(null) },
    });
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
      await dispatch(fetchAddressByUserId(userId)).unwrap();
    } catch (error) {
      Alert.alert('Success to delete address');
    }
  };

  const handleSelect = (id) => {
    setSelectedAddress(prevSelected => (prevSelected === id ? null : id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.addressItem}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={selectedAddress === item.id ? 'checked' : 'unchecked'}
          onPress={() => handleSelect(item.id)}
          color="#1e90ff" // Color of the checkbox when checked
        />
      </View>
      <View style={styles.addressInfo}>
        <Text>{item.detail}</Text>
        <Text>{item.state}</Text>
        <Text>{item.city}</Text>
        <Text>{item.country}</Text>
        <Text>{item.phoneNumber}</Text>
        <Text>{item.postalCode}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => handleEditAddress(item)}>
          <Ionicons name="create-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {addresses.length < 5 && (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add Address</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkboxContainer: {
    marginRight: 10,
  },
  addressInfo: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
