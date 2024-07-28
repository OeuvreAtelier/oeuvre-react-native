import React from "react";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import Category from "../../../components/Category";
import CardProduct from "../../../components/CardProduct"; // Pastikan nama impor sesuai dengan file komponen
import { router } from "expo-router";

const categories = [
    { id: '1', title: 'Category 1', iconName: 'home' },
    { id: '2', title: 'Category 2', iconName: 'home' },
    { id: '3', title: 'Category 3', iconName: 'home' },
    { id: '4', title: 'Category 4', iconName: 'home' },
    { id: '5', title: 'Category 5', iconName: 'home' },
    { id: '6', title: 'Category 6', iconName: 'home' },
    { id: '7', title: 'Category 7', iconName: 'home' },
    { id: '8', title: 'Category 8', iconName: 'home' },
    { id: '9', title: 'Category 9', iconName: 'home' },
    { id: '10', title: 'Category 10', iconName: 'home' },
    { id: '11', title: 'Category 11', iconName: 'home' },
    { id: '12', title: 'Category 12', iconName: 'home' },
    { id: '13', title: 'Category 13', iconName: 'home' },
    { id: '14', title: 'Category 14', iconName: 'home' },
    { id: '15', title: 'Category 15', iconName: 'home' },
    { id: '16', title: 'Category 16', iconName: 'home' },
    { id: '17', title: 'Category 17', iconName: 'home' },
    { id: '18', title: 'Category 18', iconName: 'home' },
];

const bestSellers = [
    { id: '1', category: 'Category', name: 'Product 1', seller: 'Seller 1', price: '$100' },
    { id: '2', category: 'Category', name: 'Product 2', seller: 'Seller 2', price: '$200' },
];

const recommendations = [
    { id: '1', category: 'Category', name: 'Recommended Product 1', seller: 'Seller 3', price: '$150' },
    { id: '2', category: 'Category', name: 'Recommended Product 2', seller: 'Seller 4', price: '$250' },
];

const Home = () => {

    const handlePress = (product) => {
        router.push('detailProduct', { product });
    };
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <Category title={item.title} iconName={item.iconName} />}
                    keyExtractor={(item) => item.id}
                    numColumns={9}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.categoryContainer}
                />
            </ScrollView>

            <Text style={styles.heading}>Best Seller</Text>
            <View style={styles.bestSellerContainer}>
                {bestSellers.map(product => (
                    <CardProduct 
                        key={product.id}
                        category={product.category}
                        name={product.name}
                        seller={product.seller}
                        price={product.price}
                        onPress={() => handlePress(product)}
                    />
                ))}
            </View>

            <Text style={styles.heading}>Recommendations</Text>
            <View style={styles.recommendationContainer}>
                {recommendations.map(product => (
                    <CardProduct 
                        key={product.id}
                        category={product.category}
                        name={product.name}
                        seller={product.seller}
                        price={product.price}
                        onPress={() => handlePress(product)}
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
    },
    row: {
        justifyContent: "space-between",
    },
    bestSellerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    recommendationContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
});

export default Home;
