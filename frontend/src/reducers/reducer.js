import { PRODUCTS_LIST_FAILURE, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_REQUEST } from '../constants/ProductConstants';

export const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case PRODUCTS_LIST_REQUEST:
            return { ...state, products: [], loading: true }

        case PRODUCTS_LIST_SUCCESS:
            return { ...state, products: payload, loading: false }

        case PRODUCTS_LIST_FAILURE:
            return { ...state, error: payload, loading: false }

        default:
            return state
    }
}