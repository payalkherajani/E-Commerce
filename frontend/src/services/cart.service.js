import axios from 'axios'
import Config from '../config/Config';
import { toast } from 'react-toastify';
import { GET_CART_DATA } from '../constants/type';
import { auth } from '../utlis/auth';
const { serverUrl } = Config

const token = auth();

export const fetchCartProducts = async (dispatch) => {
    try {
        const { data: { productsinCart } } = await axios.get(`${serverUrl}/api/carts`, { headers: token });
        dispatch({ type: GET_CART_DATA, payload: productsinCart })
    } catch (err) {
        const error = err.response.data.message;
        toast.error(`${error}`);
    }
}

