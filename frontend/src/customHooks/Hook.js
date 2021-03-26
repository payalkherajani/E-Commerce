import { useContext } from 'react';
import { Context } from '../contexts/Context';

const useCustomContext = () => {
    return useContext(Context);
}

export default useCustomContext;