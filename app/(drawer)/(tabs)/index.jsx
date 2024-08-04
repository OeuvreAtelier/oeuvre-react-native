import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import Category from "../../../components/Category";
import CardProduct from "../../../components/CardProduct"; 
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, fetchProductsByNameCategoryAndType } from '../../../redux/features/productSlice';

const categories = [
    { id: '1', title: 'AUDIO', iconName: 'musical-notes', value: 'AUDIO' },
    { id: '2', title: 'COSPLAY', iconName: 'body', value:"COSPLAY" },
    { id: '3', title: 'FASHION', iconName: 'shirt', value:"FASHION" },
    { id: '4', title: 'FIGURES', iconName: 'man', value:"FIGURES" },
    { id: '5', title: 'GAMES', iconName: 'game-controller', value:"GAMES" },
    { id: '6', title: 'GOODS', iconName: 'gift', value:"GOODS" },
    { id: '7', title: 'ILLUSTRATION', iconName: 'color-palette', value:"ILLUSTRATION" },
    { id: '8', title: 'NOVEL/BOOKS', iconName: 'book', value:"NOVEL_BOOKS" },
    { id: '9', title: 'MUSIC', iconName: 'musical-notes', value:"MUSIC" },
    { id: '10', title: 'PHOTOGRAPH', iconName: 'camera', value:"PHOTOGRAPH" },
    { id: '11', title: 'SOFTWARE/HARDWARE', iconName: 'desktop', value:"SOFTWARE_HARDWARE" },
    { id: '12', title: 'VIDEO', iconName: 'videocam', value:"VIDEO" },
];

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const handlePress = (product) => {
        router.push({ pathname: 'detailProduct', params: {
            ...product,
            description: JSON.stringify(product.description),
            image: JSON.stringify(product.image),
        } });
    };

    const handleCategoryPress = (category) => {
        dispatch(fetchProductsByNameCategoryAndType({ category }));
        
        router.push({
            pathname: 'discovery',
            params: { category },
        });
    };
//
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <Category 
                            title={item.title} 
                            iconName={item.iconName}  
                            onPress={() => handleCategoryPress(item.title)} 
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={6}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.categoryContainer}
                />
            </ScrollView>
            <Text style={styles.heading}>Best Seller</Text>
            <View style={styles.productContainer}>
                {products && products.map(item => (
                    <CardProduct 
                        key={item.id}
                        category={item.category}
                        name={item.name}
                        seller={item.seller}
                        price={item.price}
                        image={item.image.path}
                        onPress={() => handlePress(item)}
                    />
                ))}
            </View>

            <Text style={styles.heading}>Recommendations</Text>
            <View style={styles.productContainer}>
                {products && products.map(item => (
                    <CardProduct 
                        key={item.id}
                        category={item.category}
                        name={item.name}
                        seller={item.seller}
                        price={item.price}
                        image={item.image.path}
                        onPress={() => handlePress(item)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
    },
    categoryContainer: {
        alignItems: "flex-start",
        paddingVertical: 10,
    },
    row: {
        justifyContent: "space-between",
    },
    productContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default Home;
