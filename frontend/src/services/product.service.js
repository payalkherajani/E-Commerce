import axios from 'axios'
import Config from '../config/Config';
import { toast } from 'react-toastify';
import { PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAILURE } from '../constants/type';
import { auth } from '../utlis/auth';
const { serverUrl } = Config

const token = auth();
export const fetchProducts = async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_LIST_REQUEST })
        const { data } = await axios.get(`${serverUrl}/api/products`, { headers: token });
        dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: PRODUCTS_LIST_FAILURE, payload: 'Something went Wrong' })
        const error = err.response.data.message;
        toast.error(`${error}`);

    }
}