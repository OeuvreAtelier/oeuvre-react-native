import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByNameCategoryAndType } from '../../../redux/features/productSlice';
import CardProduct from '../../../components/CardProduct';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';

const Discovery = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const router = useRouter();
    const { category } = useLocalSearchParams(); // Mengambil parameter kategori jika ada
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(category || '');
    const [selectedType, setSelectedType] = useState('');
    const [productName, setProductName] = useState('');

    useEffect(() => {
        dispatch(fetchProductsByNameCategoryAndType({
            productName: '',
            category: selectedCategory,
            type: '',
        }));
    }, [dispatch, selectedCategory]);

    const handlePress = (product) => {
        router.push({
            pathname: 'detailProduct',
            params: {
                ...product,
                description: JSON.stringify(product.description),
                image: JSON.stringify(product.image),
            }
        });
    };

    const handleFilterPress = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const applyFilters = () => {
        dispatch(fetchProductsByNameCategoryAndType({
            productName: productName,
            category: selectedCategory,
            type: selectedType,
        }));
        closeModal();
    };

    const renderItemProduct = ({ item }) => (
        <CardProduct
            key={item.id}
            category={item.category}
            name={item.name}
            seller={item.seller}
            price={item.price}
            image={item.image.path}
            onPress={() => handlePress(item)}
        />
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>Discovery</Text>
                <TouchableOpacity onPress={handleFilterPress}>
                    <Ionicons name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={products}
                renderItem={renderItemProduct}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.productContainer}
            />
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                onSwipeComplete={closeModal}
                swipeDirection="down"
                style={styles.bottomModal}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filter Products</Text>

                    <Text style={styles.filterLabel}>Category</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="All Categories" value="" />
                        <Picker.Item label="Audio" value="AUDIO" />
                        <Picker.Item label="Cosplay" value="COSPLAY" />
                        <Picker.Item label="Fashion" value="FASHION" />
                        <Picker.Item label="Figures" value="FIGURES" />
                        <Picker.Item label="Games" value="GAMES" />
                        <Picker.Item label="Goods" value="GOODS" />
                        <Picker.Item label="Illustration" value="ILLUSTRATION" />
                        <Picker.Item label="Novel/Books" value="NOVEL_BOOKS" />
                        <Picker.Item label="Music" value="MUSIC" />
                        <Picker.Item label="Photograph" value="PHOTOGRAPH" />
                        <Picker.Item label="Software/Hardware" value="SOFTWARE_HARDWARE" />
                        <Picker.Item label="Video" value="VIDEO" />
                    </Picker>

                    <Text style={styles.filterLabel}>Type</Text>
                    <Picker
                        selectedValue={selectedType}
                        onValueChange={(itemValue) => setSelectedType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="All Types" value="" />
                        <Picker.Item label="Physical" value="PHYSICAL" />
                        <Picker.Item label="Digital" value="DIGITAL" />
                    </Picker>

                    <Button title="Apply Filters" onPress={applyFilters} />
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        minHeight: 200,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    filterLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    picker: {
        marginBottom: 20,
    },
});

export default Discovery;
