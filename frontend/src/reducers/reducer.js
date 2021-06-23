import { ADD_ITEM_TO_CART, ADD_TO_CART, REMOVE_FROM_CART, CLEAR_ALL_FILTERS, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH, SEARCH_KEYWORD_REQUEST, CLEAR_SEARCH, PRODUCTS_LIST_FAILURE, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_REQUEST, PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCESS, GET_CART_DATA, GET_WISHLIST_DATA, USER_LOGGED_IN, USER_LOGOUT, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, FETCH_USER_DETAILS, EXCLUDE_OUT_OF_STOCK } from '../constants/type';

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

        case ADD_TO_WISHLIST:
        case REMOVE_FROM_WISHLIST:
        case GET_WISHLIST_DATA:
            return { ...state, wishlist: payload }

        case ADD_TO_CART:
        case REMOVE_FROM_CART:
        case ADD_ITEM_TO_CART:
        case GET_CART_DATA:
            return { ...state, cart: payload }

        case PRICE_HIGH_TO_LOW:
            return { ...state, sortBy: payload }

        case PRICE_LOW_TO_HIGH:
            return { ...state, sortBy: payload }

        case CLEAR_ALL_FILTERS:
            return { ...state, sortBy: '', exclude_out_of_stock: false }

        case SEARCH_KEYWORD_REQUEST:
            const toSearch = payload.toLowerCase();
            return { ...state, keyword: toSearch }

        case CLEAR_SEARCH:
            return { ...state, keyword: '' }

        case USER_LOGGED_IN:
            localStorage.setItem('TOKEN', payload);
            return state

        case USER_LOGOUT:
            localStorage.removeItem('TOKEN', payload);
            return { ...state, user: {} }

        case FETCH_USER_DETAILS:
            return { ...state, user: payload }

        case EXCLUDE_OUT_OF_STOCK:
            return { ...state, exclude_out_of_stock: payload }
        default:
            return state
    }
}