import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress, updateAddress } from '../../../redux/features/addressSlice';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AddressForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const address  = useLocalSearchParams();
  const userId = useSelector((state) => state.user.data.id);

  const [id, setId] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [detail, setDetail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (address) {
      setId(address.id);
      setCountry(address.country);
      setCity(address.city);
      setDetail(address.detail);
      setState(address.state);
      setPostalCode(address.postalCode);
      setPhoneNumber(address.phoneNumber);
    }
  }, []);

  const handleSubmit = async () => {
    const data = {
      id: id,
      userId: userId,
      country: country,
      city: city,
      detail: detail,
      state: state,
      postalCode: postalCode,
      phoneNumber: phoneNumber,
    };

    try {
      if (id) {
        await dispatch(updateAddress(data)).unwrap(); 
      } else {
        await dispatch(createAddress(data)).unwrap();
      }
      router.push('address'); 
      Alert.alert('Success to save address')
    } catch (err) {
      Alert.alert('Failed to save address', err.message);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {id ? 'Edit Address' : 'Add Address'}
        </Text>
        <ScrollView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Country/Region"
            value={country}
            onChangeText={setCountry}
          />
          <TextInput
            style={styles.input}
            placeholder="State/Province"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.textarea}
            placeholder="Detailed Address"
            value={detail}
            multiline
            numberOfLines={4}
            onChangeText={setDetail}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal/Zip Code"
            value={postalCode}
            onChangeText={setPostalCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    width: '90%',
    maxHeight: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    padding: 8,
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1e90ff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
