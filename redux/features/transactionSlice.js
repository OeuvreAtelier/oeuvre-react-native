import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (transaction, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.post("/transactions", transaction);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const fetchTransactionsByUserId = createAsyncThunk(
  "transaction/fetchTransactionsByUserId",
  async ({ userId, page }, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/transactions/user/${userId}?page=${page}`);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/transactions`);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    statusCode: null,
    message: null,
    data: [],
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionsByUserId.fulfilled, (state, action) => {
        const { data, paging } = action.payload;
        state.statusCode = "succeeded";
        state.data = data;
        state.currentPage = paging.page;
        state.totalPages = paging.totalPages;
        state.hasNext = paging.hasNext;
        state.hasPrevious = paging.hasPrevious;
        state.loading = false;
      })
      .addCase(fetchTransactionsByUserId.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default transactionSlice.reducer;