import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {

    function getTabBarIcon(routeName, {color, focused, size}) {
        let name;
        switch (routeName) {
            case "index":
                name = focused ? "home" : "home-outline"
                break;
            case "transaction":
                    name = focused ? "wallet" : "wallet-outline"
                    break;
            case "whislist":
                name = focused ? "heart" : "heart-outline"
                break;
            default:
                break;
        }
        return <Ionicons name={name} size={size} color={color} />
    }

    
    return (
        <Tabs screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: (opt) => getTabBarIcon(route.name, opt)
        })}>
            <Tabs.Screen 
            name="index" />
            <Tabs.Screen name="transaction"/>
            <Tabs.Screen name="whislist"/>
        </Tabs>
    )
}