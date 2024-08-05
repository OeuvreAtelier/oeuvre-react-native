import { View, Text, StyleSheet, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/features/userSlice";
import { useAuth } from "../../context/AuthContext";

const CustomDrawerContent = (props) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data)
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch]);

  // console.log(user)

  // useEffect(() => {
  //   if (user) {
  //     setProfileImage(user.image ? user.imagePicture.path : "https://ik.imagekit.io/muffincrunchy/oeuvre-images/user-picture/default_picture.jpg?updatedAt=1722306891846");
  //   }
  // }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoWrapper}>
          <Image
            source={user ? { uri: user.imagePicture.path } : { uri: "https://ik.imagekit.io/muffincrunchy/oeuvre-images/user-picture/default_picture.jpg?updatedAt=1722306891846" }} 
            width={80}
            height={80}
            style={styles.userImg}
          />
          <View style={styles.userDetailsWrapper}>
            <Text style={styles.userName}>{user ? user.displayName : "Guest"}</Text>
            <Text style={styles.userEmail}>{user ? user.email : ""}</Text>
            <Ionicons />
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
            router.push("(screen)/profile");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="location-outline"
              size={size}
              color={pathname == "/location" ? "#fff" : "#000"}
            />
          )}
          label={"Address"}
          labelStyle={[
            styles.navItemLabel,
            { color: pathname == "/location" ? "#fff" : "#000" },
          ]}
          style={{ backgroundColor: pathname == "/location" ? "#333" : "#fff" }}
          onPress={() => {
            router.push("(screen)/address");
          }}
        />
      </DrawerContentScrollView>
      <View style={{ marginBottom: 5 }}>
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
            router.push("(auth)");
          }}
        />
      </View>
    </View>
  );
};

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    />
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
    fontSize: 16,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }
});
