import axios from 'axios';
import Config from '../config/Config';
import { toast } from 'react-toastify';
import { ADD_TO_CART } from '../constants/type';
const { serverUrl } = Config

export const addToCart = async (item, qty, token, dispatch) => {
    try {
        const { data } = await axios.post(`${serverUrl}/api/carts`, { 'productId': item._id, 'quantity': qty }, { headers: token });
        dispatch({ type: ADD_TO_CART, payload: data.productsinCart })
    } catch (err) {
        const error = err.response.data.message;
        toast.error(`${error}`);
    }
}