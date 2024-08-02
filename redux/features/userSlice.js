import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../api/axiosInstance';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const decoded = jwtDecode(token);
    console.log(decoded)
   const user_account_id = decoded.sub;
   
    const response = await axiosInstance.get(`/users/account/${user_account_id}`);
    const userData = response.data.data;
    const roles = decoded.roles.map(role => role.role);

    return { userData, roles };
  } catch (error) {
    console.error("Fetch User Error:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});


export const updateUser = createAsyncThunk('user/updateUser', 
  async (user, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put(`/users`, user);
    return response.data;    
  } catch (error) {
    console.error("Update User Error:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});


export const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async ({ formData, type }) => {
    const response = await axiosInstance.put(`users/picture`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(formData)
    return response.data;
  }
);

export const updateBanner = createAsyncThunk(
  "user/updateUserBanner",
  async (user, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.put("/users/banner", user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(user)
      return response.data
    } catch (error) {
      return rejectedWithValue(error.response.data)
    }
  }
)



const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    role: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.userData;
        state.role = action.payload.roles;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.statusCode = "succeeded"
        state.data = action.payload.data
        state.message = action.payload.message
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload
          state.status = "failed"
        }
      )
  },
})

export default userSlice.reducer;
