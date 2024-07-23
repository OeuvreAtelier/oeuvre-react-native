import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem, DrawerToggleButton } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoWrapper}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/26.jpg" }}
          width={80}
          height={80}
          style={styles.userImg}
        />
        <View style={styles.userDetailsWrapper}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john@email.com</Text>
        </View>
      </View>
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="person-outline"
            size={size}
            color={pathname == "/person" ? "#fff" : "#000"}
          />
        )}
        label={"Profile"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/person" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/person" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/profile");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="information-circle-outline"
            size={size}
            color={pathname == "/information-circle" ? "#fff" : "#000"}
          />
        )}
        label={"About"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/information-circle" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/information-circle" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/about");
        }}
      />
      <DrawerItem
        icon={({ color, size }) => (
          <Ionicons
            name="log-out-outline"
            size={size}
            color={pathname == "/log-out" ? "#fff" : "#000"}
          />
        )}
        label={"Logout"}
        labelStyle={[
          styles.navItemLabel,
          { color: pathname == "/log-out" ? "#fff" : "#000" },
        ]}
        style={{ backgroundColor: pathname == "/log-out" ? "#333" : "#fff" }}
        onPress={() => {
          router.push("/login");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false}}>
      <Drawer.Screen name="profile" options={{headerShown: true}}  />
      <Drawer.Screen name="about" options={{headerShown: true}} />

    </Drawer>
  );
}

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: -20,
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userImg: {
    borderRadius: 40,
  },
  userDetailsWrapper: {
    marginTop: 25,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize:16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});
