import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
const ManageProducts = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/tools')
            .then(res => res.json())
            .then(data => setTools(data))
    }, [])

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
        <div>
            <h2>{tools.length} types of tools available in the shop!</h2>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tool name</th>
                        <th>Available</th>
                        <th>Price</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        tools.map((tool, index) =>
                            <tr
                                key={tool._id}
                            >
                                <td>{index + 1}</td>
                                <td>{tool.name}</td>
                                <td>{tool.available}</td>
                                <td>{tool.price}</td>
                                <td><Button onClick={() => handleDeleteTool(tool._id)} variant="danger" size="sm">
                                    Delete
                                </Button></td>

                            </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default ManageProducts;