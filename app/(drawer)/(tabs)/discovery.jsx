import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../../redux/features/productSlice';
import CardProduct from '../../../components/CardProduct';
import { useRouter } from 'expo-router';

const Discovery = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchProduct());
        console.log(products)
    }, [dispatch]);

    const handlePress = (product) => {
        router.push({ pathname: 'detailProduct', params: product });
    };

    const renderItemProduct = ({ item }) => (
        <CardProduct
            key={item.id}
            category={item.category}
            name={item.name}
            seller={item.seller}
            price={item.price}
            image={item.image}
            onPress={() => handlePress(item)}
        />
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Discover</Text>
            <FlatList 
                data={products}
                renderItem={renderItemProduct}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.productContainer}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
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
});

export default Discovery;
