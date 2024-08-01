import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import CardProduct from "../../../components/CardProduct";
import { useRouter } from "expo-router";
import { useSelector } from 'react-redux';


const Wishlist = () => {
    const products = useSelector((state) => state.products.data);
    const router = useRouter();

    const handlePress = (product) => {
        router.push({ pathname: 'detailProduct', params: {
            ...product,
            description: JSON.stringify(product.description),
            image: JSON.stringify(product.image),
        } });
    };

    return (
        <ScrollView style={styles.container}>
            <Text>Bookmarks</Text>
            <View style={styles.cardProductList}>
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
    cardProductList: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default Wishlist;
