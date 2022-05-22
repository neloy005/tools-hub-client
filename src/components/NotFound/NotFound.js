import React from 'react';
import './NotFound.css';
import notfound from '../../images/icons/notfound.png';

const NotFound = () => {
    return (
        <div className='not-found-container'>
            <img src={notfound} alt="" />
            <h4>The page you're looking for doesn't exist!</h4>
        </div>
    );
};

export default NotFound;