import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <h2>Register</h2>
            <p>Already have an account? <Link to='/login'>Please login</Link></p>
        </div>
    );
};

export default Register;