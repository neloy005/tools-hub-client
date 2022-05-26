import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ManageSingleTool from '../ManageSingleTool/ManageSingleTool';
const ManageProducts = () => {
    const [tools, setTools] = useState([]);
    //....................................
    //Get all tool info from db
    //....................................
    useEffect(() => {
        fetch('https://enigmatic-wildwood-66605.herokuapp.com/tools')
            .then(res => res.json())
            .then(data => setTools(data))
    }, [])

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
                        tools.map((tool, index) => <ManageSingleTool
                            key={tool._id}
                            index={index + 1}
                            tool={tool}
                            tools={tools}
                            setTools={setTools}
                        ></ManageSingleTool>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default ManageProducts;