import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = ({ order }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardErr, setCardErr] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState('');
    const [transectionId, setTransectionId] = useState('');
    const { _id, toPay, name, email } = order;

    useEffect(() => {
        fetch('https://enigmatic-wildwood-66605.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ toPay })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }

            })
    }, [toPay])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardErr(error.message);
        }
        else {
            setCardErr('');
        }
        setSuccess('');

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );
        if (intentError) {
            setCardErr(intentError?.message);
        }
        else {
            setCardErr('');
            setTransectionId(paymentIntent.id)
            setSuccess('Payment completed successfully!');

            //store payment of DB
            const payment = {
                orderId: _id,
                transectionId: paymentIntent.id,
                status: 'pending'
            }
            fetch(`https://enigmatic-wildwood-66605.herokuapp.com/order/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)

            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Your payment is successfull!')
                })
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <p style={{ 'color': 'red' }}><small>{cardErr}</small></p>
            {
                success && <div style={{ 'color': 'green' }}>
                    <p>{success}</p>
                </div>
            }
            <Button style={{ 'marginTop': '15px' }} disabled={!stripe || !clientSecret} variant="success" type="submit" size="sm">
                Pay
            </Button>
        </form>
    );
};

export default CheckoutForm;