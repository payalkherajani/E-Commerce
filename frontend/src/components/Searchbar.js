import React from 'react';
import useCustomContext from '../customHooks/Hook';
import { SEARCH_KEYWORD_REQUEST, CLEAR_SEARCH } from '../constants/FilterConstants';

const Searchbar = () => {

    const { state, dispatch } = useCustomContext();

    const handleSearch = (e) => {
        dispatch({ type: SEARCH_KEYWORD_REQUEST, payload: e.target.value })
    }

    const clearSearch = () => {
        dispatch({ type: CLEAR_SEARCH })
    }

    return (
        <div className="searchbar">
            <input type="text" className="form-control width-half" placeholder="Search Product ..." onChange={handleSearch} value={state.keyword} />
            <i className="fas fa-times search-icon" onClick={clearSearch}></i>
        </div>
    )
}

export default Searchbar;