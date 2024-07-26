import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    // login(username, password)
    // router.replace('(drawer)')
    
  // }
    e.preventDefault();

    try {
      const success = await login(username, password);
      console.log("success...", success);
      if (success) {
        router.replace('(drawer)');
      } else {
        setErrorMessage("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container}>
      {/* <View style={styles.logoContainer}>
        <Image source={require('./path/to/your/logo.png')} style={styles.logo} />
      </View> */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 175,
    height: 175,
    resizeMode: "contain",
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
