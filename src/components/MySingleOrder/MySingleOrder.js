import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MySingleOrder = ({ order, index, orders, setOrders }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { toolName, quantity, toPay, isPaid } = order;

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
        handleClose();
    }
    return (
        <tr>
            <td>{index}</td>
            <td>{toolName}</td>
            <td>{quantity}</td>
            <td>${toPay}</td>
            <td>{
                isPaid ? <>
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
        </tr>
    );
};

export default MySingleOrder;