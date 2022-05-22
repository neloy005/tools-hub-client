import React from 'react';
import { useParams } from 'react-router-dom';
import './Purchase.css';

const Purchase = () => {
    const { id } = useParams();

    return (
        <div>
            <h2>Purchase:{id}</h2>
        </div>
    );
};

export default Purchase;