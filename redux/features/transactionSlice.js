import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosInstance"

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (transaction, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.post("/transactions", transaction)
      console.log(response.data)
      return response.data
    } catch (error) {
      return rejectedWithValue(error.response.data)
    }
  }
)

export const fetchTransactionsByUserId = createAsyncThunk(
  "transaction/fetchTransactionsByUserId",
  async (userId, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/transactions/user/${userId}`)
      console.log("Response", response.data)
      return response.data
    } catch (error) {
      return rejectedWithValue(error.response.data)
    }
  }
)

export const fetchTransactions = createAsyncThunk(
  "transaction/fetchTransactions",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/transactions`)
      return response.data
    } catch (error) {
      return rejectedWithValue(error.response.data)
    }
  }
)

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    statusCode: null,
    message: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.statusCode = "succeeded"
        state.data = action.payload.data
      })
      .addCase(fetchTransactionsByUserId.fulfilled, (state, action) => {
        state.statusCode = "succeeded"
        state.data = action.payload.data
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.statusCode = "succeeded"
        state.data = action.payload.data
      })
  },
})

export default transactionSlice.reducer
