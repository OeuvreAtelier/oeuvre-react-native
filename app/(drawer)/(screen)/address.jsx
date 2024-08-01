// AddressScreen.js
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { fetchUser } from '../../../redux/features/userSlice';
import { fetchAddressByUserId } from '../../../redux/features/addressSlice';

export default function AddressScreen() {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const user = useSelector((state) => state.user.data);
  const addresses = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchUser())
    if(user){

        dispatch(fetchAddressByUserId(user.id
        ))
    }
  }, [dispatch])


  const handleEdit = (address) => {
    router.push({
      pathname: 'addressForm',
      params: { state: JSON.stringify({ address }) },
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
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.addressItem}>
            <Text>{item.detail}</Text>
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
