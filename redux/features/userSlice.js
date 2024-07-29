import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const decoded = jwtDecode(token);
    const user_account_id = decoded.sub;

    const response = await axiosInstance.get(`/users/account/${user_account_id}`);
    const userData = response.data.data;
    const roles = userData.userAccount.roles.map(role => role.role);

    return { userData, roles };
  } catch (error) {
    console.error("Fetch User Error:", error);
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    role: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.userData;
        state.role = action.payload.roles;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
