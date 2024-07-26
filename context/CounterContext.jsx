import { createContext, useContext, useReducer } from "react"

const initialState = {count: 0}

const counterReducer= (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {count : state.count + 1}
        case 'DECREMENT':
            return {count : state.count - 1}
        default:
            return state
    }
}

const CounterContext = createContext()

export const CounterProvider = ({children}) => {
    const [state, dispatch] = useReducer(counterReducer, initialState)

    return (
        <CounterContext.Provider value={{state, dispatch}}>
            {children}
        </CounterContext.Provider>
    )
}

export const useCounter = () => useContext(CounterContext)
