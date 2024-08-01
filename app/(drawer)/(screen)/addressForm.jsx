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
} from 'react-native';

export default function AddressForm({ onClose, initialData }) {
  const userId = useSelector((state) => state.user.data.id)
  const [formData, setFormData] = useState(initialData || {});
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        userId: initialData.userId || '',
        country: initialData.country || '',
        state: initialData.state || '',
        city: initialData.city || '',
        detail: initialData.detail || '',
        postalCode: initialData.postalCode || '',
        phoneNumber: initialData.phoneNumber || '',
      });
    }
   
  }, [initialData]);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData)

  const handleSubmit = async () => {
    try {
      const dataToSubmit = { ...formData, userId }; // Pastikan userId ada di data yang dikirim
      const action = formData.id ? updateAddress(dataToSubmit) : createAddress(dataToSubmit);
      await dispatch(action).unwrap();
      onClose();  // Menutup form setelah sukses
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {formData.id ? 'Edit Address' : 'Add Address'}
        </Text>
        <ScrollView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Country/Region"
            value={formData.country}
            onChangeText={(text) => handleChange('country', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="State/Province"
            value={formData.state}
            onChangeText={(text) => handleChange('state', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={formData.city}
            onChangeText={(text) => handleChange('city', text)}
          />
          <TextInput
            style={styles.textarea}
            placeholder="Detailed Address"
            value={formData.detail}
            multiline
            numberOfLines={4}
            onChangeText={(text) => handleChange('detail', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Postal/Zip Code"
            value={formData.postalCode}
            onChangeText={(text) => handleChange('postalCode', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="numeric"
            value={formData.phoneNumber}
            onChangeText={(text) => handleChange('phoneNumber', text)}
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
