import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import SingleOrder from '../SingleOrder/SingleOrder';

const ManageAllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])

    // const handleDeleteOrder = id => {
    //     console.log(id);
    //     const url = `http://localhost:5000/order/${id}`;
    //     fetch(url, {
    //         method: 'DELETE'
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.deletedCount > 0) {
    //                 toast.success('Deleted successfully!');
    //                 const remaining = orders.filter(order => order._id !== id);
    //                 setOrders(remaining);
    //             }
    //         })
    //     handleClose();
    // }

    return (
        <div>
            <h2>Total {orders.length} orders on the list</h2>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Buyer</th>
                        <th>Tool Name</th>
                        <th>Quantity</th>
                        <th>To pay</th>
                        <th>Unpaid/Pending</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => <SingleOrder
                            key={order._id}
                            index={index + 1}
                            order={order}
                            setOrders={setOrders}
                            orders={orders}
                        ></SingleOrder>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default ManageAllOrders;