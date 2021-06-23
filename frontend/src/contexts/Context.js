import { createContext, useReducer } from 'react';
import { reducer } from '../reducers/reducer';

export const Context = createContext({});

const initialState = {
    products: [],
    cart: [],
    wishlist: [],
    error: '',
    loading: false,
    product: {},
    sortBy: '',
    keyword: '',
    user: {},
    exclude_out_of_stock: false
}

export const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}