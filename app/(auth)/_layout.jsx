import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useAuth } from "../../context/AuthContext";

const AuthLayout = () => {
  const {isLoggedIn } = useAuth();

  if (isLoggedIn) return <Redirect href="(tabs)" />;

  return (
    <>
   
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />

    </>
    
  );
};

export default AuthLayout;