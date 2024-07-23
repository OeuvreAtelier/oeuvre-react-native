import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { DrawerToggleButton } from '@react-navigation/drawer';

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
                name = focused ? "bookmarks" : "bookmarks-outline"
                break;
            default:
                break;
        }
        return <Ionicons name={name} size={size} color={color} />
    }

    
    return (
        <Tabs screenOptions={({ route }) => ({
            tabBarIcon: (opt) => getTabBarIcon(route.name, opt),
            headerRight: () => <DrawerToggleButton tintColor="#000"/>
          })}>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="transaction" options={{ title: "Transaction" }} />
            <Tabs.Screen name="whislist" options={{ title: "Bookmarks" }} />
          </Tabs>
        );
}