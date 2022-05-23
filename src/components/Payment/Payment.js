import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './Payment.css';

const Payment = () => {
    const { id } = useParams();
    const url = `http://localhost:5000/order/${id}`;
    const { data: order, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>;
    }
    return (
        <div>
            <div className='order-summary'>
                <h2>Hello {order.name},</h2>
                <p>You're about to pay <span className='highlited-text'>${order.toPay}</span> for your <span className='highlited-text'>{order.quantity} pcs</span> order of <span className='highlited-text'>{order.toolName}</span></p>
            </div>
            <div>

            </div>

        </div>
    );
};

export default Payment;