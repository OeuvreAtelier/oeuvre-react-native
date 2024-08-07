import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { fetchProductsByNameCategoryAndType } from '../redux/features/productSlice';

const Category = ({ title, value, iconName }) => {
    const dispatch = useDispatch();
    const router = useRouter();

     const handleCategoryPress = () => {
        console.log("handle", value);
        dispatch(fetchProductsByNameCategoryAndType({ category: value }));
        router.push({
            pathname: 'discovery',
            params: { category: value },
        });
    };

    useEffect(() => {
        // dispatch());
    }, [dispatch]);

    // const handleCategorySelect = () => {
    //     dispatch(fetchProductsByNameCategoryAndType({ category: value }));
        
    //     router.push({
    //         pathname: 'discovery',
    //         params: { category: value },
    //     });
    // };

    return (
        <TouchableOpacity onPress={handleCategoryPress}>
            <View style={styles.container}>
                <Ionicons name={iconName} size={18} color="#000" style={styles.icon} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
        margin: 5,
        backgroundColor: "#fff",
        borderRadius: 5,
        width: 90,
        height: 50,
        justifyContent: "center",
    },
    icon: {
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
    },
});

export default Category;
