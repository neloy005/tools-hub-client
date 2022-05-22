import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tools.css';

const Tools = ({ tool }) => {
    const navigate = useNavigate();
    const { _id, name, description, price, image, minOrder, available } = tool;

    const navigateToPurchase = id => {
        navigate(`/purchase/${id}`);

    }
    return (
        <div className='single-card'>
            <img src={image} alt="" />
            <h2>{name}</h2>
            <p>{description}</p>
            <hr />
            <div className='minimum-and-available'>
                <p>Minimum <br /><span style={{ 'fontSize': '30px' }}>{minOrder}</span><br /> pieces</p>
                <p>Price <br /><span style={{ 'fontSize': '30px' }}>${price}</span><br /> /unit</p>
                <p>Available <br /><span style={{ 'fontSize': '30px' }}>{available}</span><br /> pieces</p>
            </div>
            <hr />
            <button onClick={() => navigateToPurchase(_id)} className='submit-btn'>Place Order</button>
        </div>
    );
};

export default Tools;