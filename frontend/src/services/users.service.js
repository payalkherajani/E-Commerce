import axios from 'axios'
import Config from '../config/Config';
import { toast } from 'react-toastify';
import { FETCH_USER_DETAILS } from '../constants/type';
import { auth } from '../utlis/auth';
const { serverUrl } = Config

const token = auth();
export const fetchUserDetails = async (dispatch) => {
    try {
        const { data } = await axios.get(`${serverUrl}/api/users`, { headers: token });
        dispatch({ type: FETCH_USER_DETAILS, payload: data })
    } catch (err) {
        const error = err.response.data.message;
        toast.error(`${error}`);
    }
}