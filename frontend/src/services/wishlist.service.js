import axios from 'axios'
import Config from '../config/Config';
import { toast } from 'react-toastify';
import { GET_WISHLIST_DATA } from '../constants/type';
import { auth } from '../utlis/auth';
const { serverUrl } = Config

const token = auth();

export const fetchProductsinWishlist = async (dispatch) => {
    try {
        const { data: { productsinWishlist } } = await axios.get(`${serverUrl}/api/wishlists`, { headers: token });
        dispatch({ type: GET_WISHLIST_DATA, payload: productsinWishlist })
    } catch (err) {
        const error = err.response.data.message;
        toast.error(`${error}`);
    }
}