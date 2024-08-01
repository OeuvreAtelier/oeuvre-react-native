import React, { createContext, useContext, useReducer } from "react";
import axiosInstance from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  token: null,
  username: null
};

const initializeState = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    console.log(token)
    const username = await AsyncStorage.getItem("username");
    const isLoggedIn = !!token;

    return {
      isLoggedIn,
      token,
      username,
    };
  } catch (error) {
    console.error("Failed to load initial state:", error);
    return initialState;
  }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        username: action.payload.username,
      };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, token: null, username: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  React.useEffect(() => {
    const fetchInitialState = async () => {
      const state = await initializeState();
      dispatch({ type: "LOGIN", payload: state });
    };
    fetchInitialState();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      console.log(response)
      const { data } = response.data;
      if (data) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("username", data.username);
        await AsyncStorage.setItem("isLoggedIn", "true");  

        dispatch({
          type: "LOGIN",
          payload: { token: data.token, username: data.username },
        });
        console.log(data)
        return true;
      }
    } catch (error) {
      console.error("Login Failed: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("isLoggedIn");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        password,
      });
      return response.status === 201;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const value = { ...authState, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
