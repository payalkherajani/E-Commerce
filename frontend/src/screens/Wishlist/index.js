import React from 'react';
import useCustomContext from '../../customHooks/Hook';
import { REMOVE_FROM_WISHLIST } from '../../constants/WishListConstants';

const WishList = () => {
    const { state: { wishlist }, dispatch } = useCustomContext();

    const removefromWishList = (id) => {
        dispatch({ type: REMOVE_FROM_WISHLIST, payload: id })
    }

    return (
        <div>
            {
                wishlist && wishlist.map((wish) => (
                    <ul key={wish.id}>
                        <li>{wish.id}</li>
                        <li>{wish.name}</li>
                        <li>{wish.description}</li>
                        <button onClick={() => removefromWishList(wish.id)}>Remove From WishList </button>
                    </ul>
                ))
            }
        </div>
    )
}

export default WishList;