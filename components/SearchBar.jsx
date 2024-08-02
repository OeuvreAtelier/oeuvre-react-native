import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from 'react-redux';
import { fetchProductsByNameCategoryAndType } from '../redux/features/productSlice';
import { useRouter } from "expo-router";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearch = () => {
    dispatch(fetchProductsByNameCategoryAndType({
      productName: searchText,
      category: '',
      type: '',
    }));
    
    router.push({ pathname: 'discovery', params: { productName: searchText } });
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <Ionicons style={styles.searchIcon} name="search-outline" size={16} color="#ccc" />
        <TextInput
          style={styles.input}
          placeholder="Catalog"
          placeholderTextColor="#ccc"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}  
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#000',
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
});

export default SearchBar;
