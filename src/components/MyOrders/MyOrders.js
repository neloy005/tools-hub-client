import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import './MyOrders.css';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/order?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                });
        }
    }, [user])
    const handleDelete = id => {
        console.log(id);
        const url = `http://localhost:5000/order/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Deleted successfully!');
                    const remaining = orders.filter(order => order._id !== id);
                    setOrders(remaining);
                }
            })
        // handleClose();
    }
    return (
        <div className='my-orders-div'>
            <h3>Hello {user.displayName}, you've {orders.length} orders so far!</h3>
            <div className='table-container'>
                <Table responsive striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tool Name</th>
                            <th>Quantity</th>
                            <th>To pay</th>
                            <th>Pay/Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) =>
                                <tr
                                    key={order._id}
                                >
                                    <td>{index + 1}</td>
                                    <td>{order.toolName}</td>
                                    <td>{order.quantity}</td>
                                    <td>${order.toPay}</td>
                                    <td>{
                                        order.isPaid ? <>
                                            <p style={{ 'color': 'green' }}><small>Paid<br />{order.transectionId}</small></p>
                                        </> : <><>
                                            <Button variant="danger" size="sm" onClick={handleShow}>
                                                Cancel
                                            </Button>
                                            <Modal show={show} onHide={handleClose} animation={false}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Are you sure to cancel the order?</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleDelete(order._id)}>
                                                        Yes
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </><span> Or </span>
                                            <Link to={`/dashboard/payment/${order._id}`}><Button variant="success" size="sm">
                                                Pay
                                            </Button></Link>
                                        </>
                                    }</td>
                                </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default MyOrders;