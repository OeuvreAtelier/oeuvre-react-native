import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../api/axiosInstance"

const initialState = {
    statusCode: null,
    message: null,
    data: []
}

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async (_, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.get(`/products?page=${page}`)
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data)
        }
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (products, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.post('/products', products, {
                headers: {}
            });
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data)
        }
    }
)

export const fetchProductsByUserId = createAsyncThunk(
    "Products/fetchProductsByUserId",
    async ({ userId }, { rejectedWithValue }) => {
      try {
        const response = await axiosInstance.get(
          `/products/artist/${userId}`
        )
        return response.data
      } catch (error) {
        return rejectedWithValue(error.response.data)
      }
    }
  )

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (products, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.put('/products', products)
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/products/${id}`)
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data)
        }
    }
)

export const fetchProductsByNameCategoryAndType = createAsyncThunk(
    "Products/fetchProductsByNameAndCategoryAndType",
    async ({ productName, category, type, page }, { rejectedWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/products/search?name=${productName}&category=${category}&type=${type}`
            )
            return response.data
        } catch (error) {
            return rejectedWithValue(error.response.data)
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.statusCode = 'succeeded';
                state.data = action.payload.data;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.data.findIndex(products => products.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload;
                }
                state.status = 'succeeded';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.data = state.data.filter((product) => product.id !== action.meta.arg);
                state.status = 'succeeded';
            })
            .addCase(fetchProductsByNameCategoryAndType.fulfilled, (state, action) => {
                state.statusCode = "succeeded"
                state.data = action.payload.data
                state.paging = action.payload.paging
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.error = action.payload;
                    state.status = 'failed';
                }
            );
    }
})

export default productsSlice.reducer