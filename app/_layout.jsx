import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";

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
              <Stack.Screen
              name="(auth)"
              options={{
                  headerShown: false
              }} />
          </Stack>
        </AuthProvider>
    )
}
