import React from 'react';
import { CLEAR_ALL_FILTERS, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH } from '../constants/type';
import useCustomContext from '../customHooks/Hook';

const Sidebar = () => {
    const { state: { sortBy }, dispatch } = useCustomContext();

    const handlePriceSorting = (e) => {
        let { name, value } = e.target;
        if (name === 'ascending') {
            value = PRICE_LOW_TO_HIGH
            dispatch({ type: PRICE_LOW_TO_HIGH, payload: value })
        } else {
            value = PRICE_HIGH_TO_LOW
            dispatch({ type: PRICE_HIGH_TO_LOW, payload: value })
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
                    <label>
                        <input type="radio" name="ascending" onChange={handlePriceSorting} checked={sortBy && sortBy === PRICE_LOW_TO_HIGH} className="checkmark" value={sortBy} />
                         LOW TO HIGH
                    </label>
                </li>
                <li className="sidebar-list-item gray">
                    <label>
                        <input type="radio" name="descending" onChange={handlePriceSorting} checked={sortBy && sortBy === PRICE_HIGH_TO_LOW} className="checkmark" value={sortBy} />
                        HIGH TO LOW
                    </label>
                </li>
            </ul>
        </section>
    )
}

export default Sidebar;