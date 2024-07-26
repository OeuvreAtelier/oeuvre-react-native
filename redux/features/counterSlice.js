import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state, action) => {
            state.value += action.payload
        },
        decrement: (state) => {
            if (state.value > 0) {
                state.value -= 1;
            }
        }
        
    }
})

export const { decrement, increment} = counterSlice.actions

export default counterSlice.reducer
