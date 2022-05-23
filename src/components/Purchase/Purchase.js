import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import './Purchase.css';
import 'react-toastify/dist/ReactToastify.css';

const Purchase = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [tool, setTool] = useState({});
    const [inputValue, setInputValue] = useState(0);
    const [isDisable, setIsDisable] = useState(false);
    const [error, setError] = useState('');
    const [availableCount, setAvailableCount] = useState(0);

    useEffect(() => {
        const url = `http://localhost:5000/tool/${id}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setTool(data);
                setInputValue(data.minOrder);
                setAvailableCount(data.available);
                if (data.available < data.minOrder) {
                    setError('Not enough item to purchase')
                    setIsDisable(true);
                }
                // console.log(inputValue);
            });
    }, [])
    const monitorOrderQuantity = event => {
        setInputValue(event.target.value);
        if (event.target.value < tool.minOrder) {
            console.log('disable it');
            setIsDisable(true);
            setError("Order must be more than minimum order and can't exceed available quantity");
            return;
        }
        if (event.target.value > availableCount) {
            setIsDisable(true);
            setError("Order must be more than minimum order and can't exceed available quantity");
            return;
        }
        setError('');
        setIsDisable(false);
    }
    const handlePlaceOrder = event => {
        event.preventDefault();
        const quantity = event.target.orderQuantity.value;
        const address = event.target.address.value;
        const phone = event.target.phone.value;
        const toPay = quantity * tool.price;
        const newAvailableCount = availableCount - quantity;
        setAvailableCount(newAvailableCount);
        const order = {
            toolId: id,
            name: user.displayName,
            email: user.email,
            quantity: quantity,
            address: address,
            phone: phone,
            toPay: toPay,
            isPaid: false
        }
        console.log(order);

        fetch('http://localhost:5000/order', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)

        })
            .then(res => res.json())
            .then(data => {
                toast.success('Order placed successfully');
                event.target.reset();
            })

        //...................................
        // Upding available quantity in DB 
        //...................................
        const updatedAvailable = { available: newAvailableCount };
        const url = `http://localhost:5000/tool/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedAvailable)
        })
            .then(res => res.json())
            .then(data => {
                console.log('success', data);
            })


    }
    return (
        <div>
            <h2 className='login-heading'>Welcome to the purchase page:</h2>
            <div>
                <h2>{tool.name}</h2>
                <p>{tool.description}</p>
                <p>Minimum order {tool.minOrder}</p>
                <p>Available {availableCount}</p>
                <p>Per unit price {tool.price}</p>
                <div>
                    <form onSubmit={handlePlaceOrder}>

                        <label>Name:</label><br />
                        <input type="text" value={user.displayName} /><br />

                        <label>Email:</label><br />
                        <input type="email" value={user.email} /><br />

                        <label>Order quantity:</label><br />
                        <input type="number" name="orderQuantity" value={inputValue} onChange={monitorOrderQuantity} /> <br />
                        <p style={{ 'color': 'red' }}><small>{error}</small></p>

                        <label>Address:</label><br />
                        <input type="text" name='address' placeholder='Your address' required /><br />

                        <label>Phone:</label><br />
                        <input type="number" name='phone' placeholder='Phone no' required /><br />

                        <input disabled={isDisable} type="submit" value="Place order" />
                    </form>
                </div>

            </div>

        </div>
    );
};

export default Purchase;