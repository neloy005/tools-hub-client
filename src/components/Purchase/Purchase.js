import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Purchase.css';

const Purchase = () => {
    const { id } = useParams();
    const [tool, setTool] = useState({});
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
            });
    }, [])
    return (
        <div>
            <h2>Purchase:{tool.name}</h2>
        </div>
    );
};

export default Purchase;