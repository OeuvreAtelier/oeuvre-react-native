import { Stack } from "expo-router";
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function ScreenLayout() {
    return (
        <Stack screenOptions={{ headerRight: () => <DrawerToggleButton tintColor="#000" />, headerBackVisible:false, headerTitleAlign: "center"}}>
            <Stack.Screen name="profile" options={{title:"Profile"}}/>
            <Stack.Screen name="about" options={{title:"About"}}/>
        </Stack>
    )
}