import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
    return (
        <AuthProvider>
        <Stack>
            <Stack.Screen 
            name="(drawer)" 
            options={{
                headerShown: false
                , header: () => <CustomHeader />
            }}/>
            <Stack.Screen
            name="(screen)"
            options={{
                headerShown: false
            }} />
        </Stack>
        </AuthProvider>
    )
}