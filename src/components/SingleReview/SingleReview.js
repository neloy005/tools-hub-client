import React from 'react';
import './SingleReview.css';

const SingleReview = ({ singleReview }) => {
    const { name, stars, review } = singleReview;
    let starsArr = [];
    for (let i = 0; i < stars; i++) {
        starsArr.push('⭐')
    }
    return (
        <div className='single-review'>
            <h2>Review by <span style={{ 'color': 'black' }}>{name}</span></h2>
            {
                starsArr.map((star, index) => <span
                    key={index}
                >⭐</span>)
            }
            <p>{review}</p>
        </div>
    );
};

export default SingleReview;