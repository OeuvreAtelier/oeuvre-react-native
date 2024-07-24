import { Stack } from "expo-router";

export default function RootLayout() {
    return (
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
    )
}