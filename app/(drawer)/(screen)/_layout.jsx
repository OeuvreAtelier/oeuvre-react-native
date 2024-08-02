import { Stack, useNavigation } from "expo-router";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EditProfile from "./editProfile"

export const unstable_settings = {
    initialRoutename: '/index',
}

export default function ScreenLayout() {
    const navigation = useNavigation();

    return (
        <Stack screenOptions={{ tintColor:'#3730a3', statusBarColor:"#3730a3", headerRight: () => <DrawerToggleButton tintColor="#3730a3" />, headerBackVisible:false, headerTitleAlign: "center"}}>
            <Stack.Screen name="profile"
            options={{title:"Profile", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#3730a3" />
              </TouchableOpacity>)
            }}/>
            <Stack.Screen name="about" 
            options={{title:"About", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#3730a3" />
              </TouchableOpacity>
            ), }}/>
            <Stack.Screen name="address" options={{title: "Address", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#3730a3" />
              </TouchableOpacity>
            ),}} />
            <Stack.Screen name="detailProduct" options={{title: "Detail Product", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Ionicons name="arrow-back" size={28} color="#3730a3" />
              </TouchableOpacity>),
                headerShown:false,
            }} />
            <Stack.Screen name="editProfile" options={{title: "Edit profile", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#3730a3" />
              </TouchableOpacity>),
                headerShown:false,
            }} />
            <Stack.Screen name="addressForm" options={{headerShown: false}} /> 
            <Stack.Screen name="cart" options={{title: "Cart", headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack(unstable_settings);
                }}>
                <Ionicons name="arrow-back" size={28} color="#3730a3" />
              </TouchableOpacity>
            ),}} />
        </Stack>
    )
}