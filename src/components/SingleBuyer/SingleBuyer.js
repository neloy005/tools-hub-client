import React from 'react';
import './SingleBuyer.css';

const SingleBuyer = ({ buyer }) => {
    const { name, shop, image, toolBought, from } = buyer;
    return (
        <div className='single-buyer'>
            <img src={image} alt="" />
            <h2>{name}</h2>
            <p style={{ 'fontSize': '20px' }}>Owner of <b>'{shop}'</b></p>
            <p>From: {from}</p>
            <hr />
            <p>Bought <br /><span style={{ 'fontSize': '25px' }}>{toolBought}</span><br /> tools from us</p>
        </div>
    );
};

export default SingleBuyer;