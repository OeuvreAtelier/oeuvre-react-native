import { Stack, useNavigation } from "expo-router";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
    initialRoutename: '/index',
}

export default function ScreenLayout() {
    const navigation = useNavigation();

    return (
        <Stack screenOptions={{ headerRight: () => <DrawerToggleButton tintColor="#000" />, headerBackVisible:false, headerTitleAlign: "center"}}>
            <Stack.Screen name="profile" 
            options={{title:"Profile", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#000" />
              </TouchableOpacity>)
            }}/>
            <Stack.Screen name="about" 
            options={{title:"About", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#000" />
              </TouchableOpacity>
            ), }}/>
            <Stack.Screen name="address" options={{title: "Address", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#000" />
              </TouchableOpacity>
            ),}} />
            <Stack.Screen name="detailProduct" options={{title: "Detail Product", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#000" />
              </TouchableOpacity>),
                headerShown:false,
            }} />
            <Stack.Screen name="cart" options={{title: "Cart", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#000" />
              </TouchableOpacity>
            ),}} />
        </Stack>
    )
}