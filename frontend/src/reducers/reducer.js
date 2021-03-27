import { PRODUCTS_LIST_FAILURE, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_REQUEST, PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCESS } from '../constants/ProductConstants';

export const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {

        case PRODUCTS_LIST_REQUEST:
            return { ...state, products: [], loading: true }

        case PRODUCTS_LIST_SUCCESS:
            return { ...state, products: payload, loading: false }

        case PRODUCTS_LIST_FAILURE:
            return { ...state, error: payload, loading: false }

        case PRODUCTS_DETAILS_REQUEST:
            return { ...state, product: {}, loading: true }

        case PRODUCTS_DETAILS_SUCCESS:
            return { ...state, product: payload, loading: false }

        case PRODUCTS_LIST_FAILURE:
            return { ...state, error: payload, loading: false }

        default:
            return state
    }
}