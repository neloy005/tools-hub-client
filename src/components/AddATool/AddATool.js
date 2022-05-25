import React from 'react';
import { toast } from 'react-toastify';
import './AddATool.css';

const AddATool = () => {
    const handleAddingTool = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const image = event.target.image.value;
        const description = event.target.description.value;
        const price = parseInt(event.target.price.value);
        const minOrder = parseInt(event.target.minorder.value);
        const available = parseInt(event.target.available.value);
        const sold = 0;

        const tool = { name, image, description, price: price, minOrder: minOrder, available: available, sold };
        console.log(tool);

        fetch('http://localhost:5000/tool', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tool)

        })
            .then(res => res.json())
            .then(data => {
                toast.success('Tool successfully added!');
                event.target.reset();
            })

    }
    return (
        <div>
            <h2>You can add a new tool here:</h2>
            <form onSubmit={handleAddingTool} className='login-container add-tool-container'>
                <input type="text" name='name' placeholder='Tool name' required /> <br /> <br />
                <input type="text" name='description' placeholder='Tool description' required /> <br /> <br />
                <input type="number" name='price' placeholder='Per unit price' required /> <br /> <br />
                <input type="text" name='image' placeholder='Image url' required /> <br /> <br />
                <input type="number" name='minorder' placeholder='Minimum order quantity' required /> <br /> <br />
                <input type="number" name='available' placeholder='Available quantity' required /> <br /> <br />
                <input className='submit-btn' type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddATool;