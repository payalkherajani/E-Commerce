import { ADD_ITEM_TO_CART, ADD_TO_CART, REMOVE_FROM_CART } from '../constants/CartConstants';
import { CLEAR_ALL_FILTERS, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH } from '../constants/FilterConstants';
import { PRODUCTS_LIST_FAILURE, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_REQUEST, PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCESS } from '../constants/ProductConstants';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../constants/WishListConstants';

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
            return { ...state, wishlist: [...state.wishlist, payload] }

        case REMOVE_FROM_WISHLIST:
            const updatedWishlist = state.wishlist.filter((x) => x.id !== payload);
            return { ...state, wishlist: updatedWishlist }

        case ADD_TO_CART:
            return { ...state, cart: [...state.cart, payload] }

        case REMOVE_FROM_CART:
            const updatedCart = state.cart.filter((x) => x.id !== payload);
            return { ...state, cart: updatedCart }

        case ADD_ITEM_TO_CART:
            const { newQty, id } = payload;
            const updatedCartItemsQty = state.cart.map((item) => {
                if (item.id === id) {
                    return { ...item, qty: newQty }
                }
                return item
            })
            return { ...state, cart: updatedCartItemsQty }

        case PRICE_HIGH_TO_LOW:
            const sortProductsdescending = state.products.sort((a, b) => b.price - a.price);
            return { ...state, products: sortProductsdescending, sortBy: payload }

        case PRICE_LOW_TO_HIGH:
            const sortProductsascending = state.products.sort((a, b) => a.price - b.price)
            return { ...state, products: sortProductsascending, sortBy: payload }

        case CLEAR_ALL_FILTERS:
            const sortbyid = state.products.sort((a, b) => a.id - b.id)
            return { ...state, products: sortbyid, sortBy: null }

        default:
            return state
    }
}