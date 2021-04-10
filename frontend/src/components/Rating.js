import React from 'react'

const Rating = ({ value, numReviews, color }) => {
    return (
        <div className="rating">
            <div>
                {
                    [...Array(parseInt(value)).keys()].map((rate, index) => {
                        return (
                            <span key={index}>
                                <i style={{ color: color }} className={
                                    rate + 1 >= 1
                                        ? 'fas fa-star'
                                        : rate + 1 >= 0.5
                                            ? 'fas fa-star-half-alt'
                                            : 'far fa-star'
                                }
                                >
                                </i>
                            </span>
                        )
                    })
                }
            </div>
            <span>
                {numReviews && numReviews} reviews
            </span>

        </div>
    )
}

Rating.defaultProps = {
    color: "#F59E0B"
}

export default Rating
