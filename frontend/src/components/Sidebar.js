import React from 'react';
import { CLEAR_ALL_FILTERS, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH } from '../constants/FilterConstants';
import useCustomContext from '../customHooks/Hook';

const Sidebar = () => {
    const { state: { sortBy }, dispatch } = useCustomContext();

    const handlePriceSorting = (e) => {
        const { name } = e.target;
        if (name === 'ascending') {
            dispatch({ type: PRICE_LOW_TO_HIGH, payload: PRICE_LOW_TO_HIGH })
        } else {
            dispatch({ type: PRICE_HIGH_TO_LOW, payload: PRICE_HIGH_TO_LOW })
        }
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_ALL_FILTERS })
    }
    return (
        <section className="sidebar sidebar-top">
            <button onClick={clearFilters} className="btn btn-danger">Clear All Filters</button>
            <ul className="sidebar-list-group">
                <li className="sidebar-list-item gray" >
                    <input type="radio" name="ascending" onChange={handlePriceSorting} checked={sortBy && sortBy === PRICE_LOW_TO_HIGH} />
                    <label> LOW TO HIGH </label>
                </li>
                <li className="sidebar-list-item gray">
                    <input type="radio" name="descending" onChange={handlePriceSorting} checked={sortBy && sortBy === PRICE_HIGH_TO_LOW} />
                    <label> HIGH TO LOW </label>
                </li>
            </ul>
        </section>
    )
}

export default Sidebar;