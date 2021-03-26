import { createContext, useReducer } from 'react';
import { reducer } from '../reducers/reducer';

export const Context = createContext({});

const initialState = {
    products: [],
    cart: [],
    wishlist: []
}

export const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}