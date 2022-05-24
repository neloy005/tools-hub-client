import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SingleOrder = ({ order, index, orders, setOrders }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { email, toolName, quantity, toPay, status } = order;

    const handleDeleteOrder = id => {
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
        handleClose();
    }
    return (
        <tr>
            <td>{index}</td>
            <td>{email}</td>
            <td>{toolName}</td>
            <td>{quantity}</td>
            <td>${toPay}</td>
            <td>{
                status === 'pending' ?
                    <Button variant="success" size="sm">
                        {order.status}
                    </Button>
                    :
                    <div>
                        <span style={{ 'color': 'white' }}>Unpaid </span>

                        <Button variant="danger" size="sm" onClick={handleShow}>
                            Cancel
                        </Button>
                        <Modal show={show} onHide={order} animation={false}>
                            <Modal.Header>
                                <Modal.Title>Are you sure to delete the order?</Modal.Title>
                            </Modal.Header>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteOrder(order._id)}>
                                    Yes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

            }</td>
        </tr>
    );
};

export default SingleOrder;