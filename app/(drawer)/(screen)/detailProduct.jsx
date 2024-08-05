import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button, Image, SafeAreaView, TouchableOpacity, Animated, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from "expo-router";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cartSlice";

const DetailProduct = () => {
    const [isHeartClicked, setIsHeartClicked] = useState(false);
    const scrollY = new Animated.Value(0);
    const navigation = useNavigation();
    const router = useRouter();
    const product = useLocalSearchParams();
    const [wishlist, setWishlist] = useState([]);
    const description = JSON.parse(product.description);
    const image = JSON.parse(product.image);
    
    const dispatch = useDispatch();
    
    console.log(product);
    const addToWishlist = (product) => {
        setWishlist([...wishlist, product]);
    };


  const handleAddToCart = () => {
    if (product.stock > 0) { 
        dispatch(addToCart(product))
        router.push('cart')        
    }
  };

    const handleHeartClick = () => {
        setIsHeartClicked(!isHeartClicked);
        if (!isHeartClicked) {
            addToWishlist(product)            
        }
    };

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.safeContainer}>
            <Animated.View style={[styles.backButton, { opacity: headerOpacity }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.cartButton, { opacity: headerOpacity }]}>
                <TouchableOpacity onPress={() => { router.push("cart") }}>
                    <Ionicons name="cart" size={24} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.menuButton, { opacity: headerOpacity }]}>
                <DrawerToggleButton tintColor="#fff" />
            </Animated.View>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <Image source={{ uri: image.path }} style={styles.image} />
                <View style={styles.bodyContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{product.name}</Text>
                    </View>
                    <Text style={styles.subtitle}>{product.category}</Text>
                    <Text style={styles.price}>Rp{product.price}</Text>
                    <Text style={styles.description}>Detail Product</Text>
                    <Text style={styles.longText}>{description.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
            <Pressable
                    style={[styles.button, product.stock === 0 && styles.soldOutButton]}
                    onPress={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    <Text style={styles.buttonText}>
                        {product.stock === 0 ? "Sold Out" : "Add to Cart"}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 15,
        zIndex: 2,
    },
    cartButton: {
        position: 'absolute',
        top: 40,
        right: 60,
        zIndex: 2,
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        right: 15,
        zIndex: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingTop: 30,
        paddingBottom: 80,
    },
    bodyContainer: {
        padding: 10
    },
    image: {
        width: "100%",
        height: 300,
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 12,
        marginBottom: 10,
    },
    price: {
        fontSize: 14,
        marginBottom: 10,
        color: "#3730a3"
    },
    description: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold"
    },
    longText: {
        fontSize: 16,
        marginBottom: 10,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#f8f8f8",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    soldOutButton: {
        backgroundColor: "#ccc",
    },
});

export default DetailProduct;
