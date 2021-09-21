import React from 'react';
import { CLEAR_ALL_FILTERS, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH, EXCLUDE_OUT_OF_STOCK } from '../constants/type';
import useCustomContext from '../customHooks/Hook';

const Sidebar = () => {
    const { state: { sortBy, exclude_out_of_stock }, dispatch } = useCustomContext();

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

    const handleCheckbox = (e) => {
        dispatch({ type: EXCLUDE_OUT_OF_STOCK, payload: e.target.checked })
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_ALL_FILTERS })
    }

    return (
        <section className="sidebar sidebar-top">
            <button onClick={clearFilters} className="btn btn-danger">Clear All Filters</button>
            <h2 style={{ marginTop: '1rem', marginLeft: '1rem' }}> Prices </h2>
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
                <h2 style={{ marginTop: '1rem' }}> Products </h2>
                <li className="sidebar-list-item gray">
                    <label>
                        <input type="checkbox" className="checkmark" onChange={handleCheckbox} value={exclude_out_of_stock} checked={exclude_out_of_stock} />
                        EXCLUDE OUT OF STOCK
                    </label>
                </li>
            </ul>
        </section>
    )
}

export default Sidebar;