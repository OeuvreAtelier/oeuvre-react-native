import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import defaultHeaderImage from '../../../assets/default-header-image.png';
import defaultProfileImage from '../../../assets/default-profile-image.png';
import CardProduct from "../../../components/CardProduct";
import { fetchUser } from "../../../redux/features/userSlice";
import axiosInstance from "../../../api/axiosInstance";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const role = useSelector((state) => state.user.role);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const [isArtist, setIsArtist] = useState(false)

  const [profileImage, setProfileImage] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);

  console.log(user)
  const handleEditProfile = (updatedData) => {
    if (user) {
      router.push({pathname: 'editProfile', params: { ...updatedData } });
    } else {
      console.error('User data not available');
    }
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const savedProfileImage = await AsyncStorage.getItem('profileImage');
        const savedHeaderImage = await AsyncStorage.getItem('headerImage');

        if (savedProfileImage) setProfileImage(savedProfileImage);
        if (savedHeaderImage) setHeaderImage(savedHeaderImage);
      } catch (error) {
        console.error('Failed to load images from storage', error);
      }
    };

    loadImages();
  }, []);
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axiosInstance.get('/users/picture'); 
          setHeaderImage(response.data.headerImage);
          const banner = await axiosInstance.get('/users/banner'); 
          setProfileImage(banner.data.profileImage);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
  
      fetchImages();
    }, []);
  
    const pickImage = async (type) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        if (type === 'header') {
          setHeaderImage(uri);
          await axiosInstance.post('/users/picture', { headerImage: uri }); 
        } else if (type === 'profile') {
          setProfileImage(uri);
          await axiosInstance.post('/users/banner', { profileImage: uri }); 
        }
      }
    };


  const handlePress = (product) => {
    router.push('detailProduct', { product });
  };


  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (status === 'succeeded' && user) {
    console.log(user)
   
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
    <Image 
        source={headerImage ? { uri: headerImage } : { uri: "https://ik.imagekit.io/muffincrunchy/oeuvre-images/user-banner/default_banner.jpg?updatedAt=1722306482126" }} 
        style={styles.headerImage} 
    />
        <TouchableOpacity style={styles.editPhotoContainerHeader} onPress={() => pickImage('header')}>
          <Ionicons name="camera" size={16} color="#fff" />
          <Text style={styles.editPhotoText}>Edit Foto</Text>
        </TouchableOpacity>
        </View>
      <View style={styles.profileImageContainer}>
        <Image
          // src="https://ik.imagekit.io/muffincrunchy/oeuvre-images/user-picture/78bb4477-8683-4bab-95f2-744ed1051b79-ks_amc_eedbS.jpeg"
          source={profileImage ? { uri: profileImage } : { uri: "https://ik.imagekit.io/muffincrunchy/oeuvre-images/user-picture/default_picture.jpg?updatedAt=1722306891846" }} 
          style={styles.profileImage} 
        />
        <TouchableOpacity style={styles.editPhotoContainerProfile} onPress={() => pickImage('profile')}>
          <Ionicons name="camera" size={12} color="#fff" />
          <Text style={styles.editPhotoTextProfile}>Edit Foto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Button title="Edit Profile" onPress={() => handleEditProfile(user)}/>
      </View>

      {user.isArtist ? (
        <View style={styles.profileDetailsContainer}>
          <View style={styles.profileDetails}>
            <Text style={styles.sectionTitle}>Data Diri</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>First Name:</Text>
                <Text style={styles.tableData}>{user.firstName}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Last Name:</Text>
                <Text style={styles.tableData}>{user.lastName}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Display Name:</Text>
                <Text style={styles.tableData}>{user.displayName}</Text>
              </View>
               <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Gender:</Text>
                <Text style={styles.tableData}>{user.gender}</Text>
              </View> 
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Birthdate:</Text>
                <Text style={styles.tableData}>{user.birthDate}</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Kontak</Text>
            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Email:</Text>
                <Text style={styles.tableData}>{user.email}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Phone Number:</Text>
                <Text style={styles.tableData}>{user.phoneNumber}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.bio}>
           {user.store.description}
           </Text>
          <View style={styles.emailContainer}>
            <Ionicons name="mail" size={18} color="#333" />
            <Text style={styles.emailText}>{user.email}</Text>
          </View>
          <View style={styles.bestSellerContainer}>
            <CardProduct 
              category="Category" 
              name="Product 1" 
              seller="Seller 1" 
              price="$100" 
              onPress={() => handlePress({ category: 'Category', name: 'Product 1', seller: 'Seller 1', price: '$100' })}
            />
            <CardProduct 
              category="Category" 
              name="Product 2" 
              seller="Seller 2" 
              price="$200" 
              onPress={() => handlePress({ category: 'Category', name: 'Product 2', seller: 'Seller 2', price: '$200' })}
            />
            <CardProduct 
              category="Category" 
              name="Product 3" 
              seller="Seller 1" 
              price="$100" 
              onPress={() => handlePress({ category: 'Category', name: 'Product 3', seller: 'Seller 1', price: '$100' })}
            />
            <CardProduct 
              category="Category" 
              name="Product 4" 
              seller="Seller 2" 
              price="$200" 
              onPress={() => handlePress({ category: 'Category', name: 'Product 4', seller: 'Seller 2', price: '$200' })}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  header: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  profileImageContainer: {
    marginTop: -50,
    marginLeft: 10,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#fff',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  displayName: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileDetailsContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  profileDetails: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  tableContainer: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tableData: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
    color: '#000',
  },
  bio: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  emailText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 5,
  },
  bestSellerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardProduct: {
    marginVertical: 10,
  },
  editPhotoContainerHeader: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  editPhotoContainerProfile: {
    position: 'absolute',
    bottom: 10,
    left: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  editPhotoText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  editPhotoTextProfile: {
    color: '#fff',
    marginLeft: 3,
    fontSize: 10,
  },
});

export default Profile;
