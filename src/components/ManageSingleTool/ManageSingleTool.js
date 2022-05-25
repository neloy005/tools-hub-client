import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ManageSingleTool = ({ tool, index, tools, setTools }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { _id, name, available, price } = tool;

    const handleDeleteTool = id => {
        console.log(id);
        const url = `http://localhost:5000/tool/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Deleted successfully!');
                    const remaining = tools.filter(tool => tool._id !== id);
                    setTools(remaining);
                }
            })
    }
    return (
        <tr>
            <td>{index}</td>
            <td>{name}</td>
            <td>{available}</td>
            <td>{price}</td>
            <td><Button variant="danger" size="sm" onClick={handleShow}>
                Delete
            </Button>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure to cancel this tool?</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteTool(_id)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal></td>

        </tr>
    );
};

export default ManageSingleTool;