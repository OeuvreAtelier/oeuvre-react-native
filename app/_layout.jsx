import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout() {

    return (
        <AuthProvider>
            <Provider store={store}>
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
            </Provider>
          
        </AuthProvider>
    )
}
