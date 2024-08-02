import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../../redux/features/userSlice';

const EditProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  // console.log("user"+user.firstName)
  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);


  const [id, setId] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [display_name, setDisplayName] = useState('');
  const [gender, setGender] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser());
    }
  }, [userStatus]);


  useEffect(() => {
    if (user) {
      setId(user.id);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setDisplayName(user.display_name);
      setGender(user.gender);
      setBirthDate(user.birth_date);
      setEmail(user.email);
      setPhoneNumber(user.phone_number);
    }
  }, [user]);

  // const userId = user.id;
  // console.log(userId)

  const handleUpdateProfile = () => {
    const updatedData = { id,first_name, last_name, display_name, gender, birth_date, email, phone_number };
    dispatch(updateUser({updatedData}))
      .unwrap()
      .then(() => {
        Alert.alert('Profile updated successfully');
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert('Failed to update profile', err.message);
      });
  };

  if (userStatus === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (userStatus === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        label="First Name"
        value={first_name}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        label="Last Name"
        value={last_name}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        label="Display Name"
        value={display_name}
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
        value={birth_date}
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
        value={phone_number}
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