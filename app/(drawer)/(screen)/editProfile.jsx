import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../../redux/features/userSlice';
import { router, useLocalSearchParams } from 'expo-router';

const EditProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useLocalSearchParams();
  // console.log("user"+user.firstName)
  const error = useSelector((state) => state.user.error);


  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  useEffect(() => {
    console.log(user)
    if (user) {
      setId(user.id);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setDisplayName(user.displayName);
      setGender(user.gender);
      setBirthDate(user.birthDate);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  }, []);

  // const userId = user.id;
  // console.log(userId)

  const handleUpdateProfile = () => {
    const data = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      gender: gender,
      birthDate: birthDate,
      email: email,
      phoneNumber: phoneNumber
    };
    dispatch(updateUser(data))
      .unwrap()
      .then(() => {
        Alert.alert('Profile updated successfully');
        router.push('profile');
      })
      .catch((err) => {
        Alert.alert('Failed to update profile', err.message);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        label="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
      />
      <TextInput
        label="Gender"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />
      <TextInput
        label="Birth Date"
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleUpdateProfile} style={styles.button}>
        Save Changes
      </Button>
      {/* <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
        Cancel
      </Button> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
});

export default EditProfile;