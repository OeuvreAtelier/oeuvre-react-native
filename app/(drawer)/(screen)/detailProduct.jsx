import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Button, Image, SafeAreaView, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import { DrawerToggleButton } from '@react-navigation/drawer';


const DetailProduct = () => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const scrollY = new Animated.Value(0);
  const navigation = useNavigation();

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const backButtonOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Animated.View style={[styles.backButton, { opacity: backButtonOpacity }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.cartButton, { opacity: backButtonOpacity }]}>
        <TouchableOpacity onPress={() => { router.push("/cart") }}>
          <Ionicons name="cart" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.menuButton, { opacity: backButtonOpacity }]}>
        <DrawerToggleButton tintColor="#000" />
      </Animated.View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Image source={{ uri: "https://via.placeholder.com/300" }} style={styles.image} />
        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Name Product</Text>
            <TouchableOpacity onPress={handleHeartClick}>
              <Ionicons 
                name={isHeartClicked ? "heart" : "heart-outline"} 
                size={24} 
                color={isHeartClicked ? "red" : "black"} 
                style={styles.heartIcon} 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Category</Text>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.description}>Detail Product</Text>
          <Text style={styles.longText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, praesentium, sed consequuntur totam eos, veniam repellendus exercitationem vel quo error accusantium! Porro veniam, nostrum quos asperiores eius totam minus iusto!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio eveniet eligendi, laborum nihil vel soluta eius molestias aspernatur magni pariatur perferendis voluptas facere unde magnam nobis. Quisquam deserunt reprehenderit similique!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, excepturi accusantium aut quae doloribus neque odit molestias, iusto voluptates animi fugiat perspiciatis rem error, non assumenda? Odio pariatur eos expedita?
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A magni, optio ipsa assumenda accusamus tenetur dolor, corrupti fugiat unde deleniti maxime aut perferendis. Aliquid, maiores quae! Ipsa laudantium aperiam aut?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos laudantium commodi aperiam alias, perspiciatis et iure nesciunt error! Sapiente repellendus necessitatibus tempora accusamus non delectus porro recusandae. Animi, doloremque dolorem.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro quae dolorem, officiis alias omnis neque fuga optio ullam eveniet laborum exercitationem doloremque quod explicabo molestiae sed aspernatur ut obcaecati eaque?
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque maxime voluptatem iusto ea sint, delectus, sapiente, quas rem repudiandae non quis accusantium! Iste quaerat rerum repellat ut nam. Tenetur, iure!
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Add to Cart" onPress={() => {}} />
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
    top: 38,
    right: 8, 
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
  heartIcon: {
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
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
});

export default DetailProduct;
