import React from 'react';
import './Tools.css';

const Tools = ({ tool }) => {
    const { name, description, image, minOrder, available } = tool;
    return (
        <div className='single-card'>
            <img src={image} alt="" />
            <h2>{name}</h2>
            <p>{description}</p>
            <hr />
            <div className='minimum-and-available'>
                <p>Minimum order <br /><span style={{ 'fontSize': '30px' }}>{minOrder}</span><br /> pieces</p>
                <p>Available <br /><span style={{ 'fontSize': '30px' }}>{available}</span><br /> pieces</p>
            </div>
            <hr />
            <button className='submit-btn'>Place Order</button>
        </div>
    );
};

export default Tools;