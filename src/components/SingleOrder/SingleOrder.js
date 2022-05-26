import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SingleOrder = ({ order, index, orders, setOrders, refetch }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { _id, email, toolName, quantity, toPay, status } = order;

    const handleDeleteOrder = id => {
        const url = `https://enigmatic-wildwood-66605.herokuapp.com/order/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Deleted successfully!');
                    refetch();
                }
            })
        handleClose();
    }

    const handleStatusShipped = () => {
        const statusCondition = { status: 'shipped' }
        const url = `https://enigmatic-wildwood-66605.herokuapp.com/order/${_id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(statusCondition)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Shipped successfully');
                refetch();
            })
    }

    return (
        <tr>
            <td>{index}</td>
            <td>{email}</td>
            <td>{toolName}</td>
            <td>{quantity}</td>
            <td>${toPay}</td>
            <td>{status && <Button onClick={handleStatusShipped} variant="success" size="sm">
                {status}
            </Button>}
                {!status && <div>
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
                </div>}
            </td>

        </tr>
    );
};

export default SingleOrder;