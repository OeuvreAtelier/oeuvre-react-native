// AddressScreen.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { fetchAddressByUserId } from '../../../redux/features/addressSlice';

export default function AddressScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const addresses = useSelector((state) => state.address.data);
  const userId = useSelector((state) => state.user.data.id)

  useEffect(() => {
    dispatch(fetchAddressByUserId(userId))
    console.log(userId);
  }, [dispatch])


  const handleEdit = (addresses) => {
    router.push({
      pathname: 'addressForm',
      params: { state: JSON.stringify({ addresses }) },
    });
  };

  const handleAdd = () => {
    router.push({
      pathname: 'addressForm',
      params: { state: JSON.stringify(null) },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.addressItem}>
            <Text>{item.detail}</Text>
            <Text>{item.state}</Text>
            <Text>{item.city}</Text>
            <Text>{item.country}</Text>
            <Text>{item.phoneNumber}</Text>
            <Text>{item.postalCode}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
          </View>
        )}
      />
      <Button title="Add Address" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addressItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
