import React from 'react';
import { CLEAR_ALL_FILTERS, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH } from '../constants/FilterConstants';
import useCustomContext from '../customHooks/Hook';

const Sidebar = () => {

    const { dispatch } = useCustomContext();

    const handlePriceSorting = (e) => {
        const { name } = e.target;
        console.log({ name });
        if (name === 'ascending') {
            dispatch({ type: PRICE_LOW_TO_HIGH })
        } else {
            dispatch({ type: PRICE_HIGH_TO_LOW })
        }
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_ALL_FILTERS })
    }
    return (
        <>
            <aside className="sidebar">
                <button onClick={clearFilters}>Clear All Filters</button>
                <ul className="sidebar-list-group">
                    <li className="sidebar-list-item gray" >
                        <button onClick={handlePriceSorting} name="ascending"> Low To High</button>
                    </li>
                    <li className="sidebar-list-item gray">
                        <button onClick={handlePriceSorting} name="descending">
                            High to Low
                            </button>
                    </li>
                </ul>

            </aside>
        </>
    )
}

export default Sidebar;