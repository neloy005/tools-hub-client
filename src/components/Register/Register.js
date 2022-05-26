import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Loading/Loading';

const Register = () => {
    let registerError;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [
        createUserWithEmailAndPassword, user, loading, error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const [token] = useToken(user);


    const handleCreateNewUSer = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        if (password.length < 6) {
            setErrorMessage('Password must be 6 charachters or more!');
            return;
        }
        setErrorMessage('');
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    }

    if (token) {
        navigate('/');
    }
    if (loading || updating) {
        return <Loading></Loading>;
    }
    if (error || updateError) {
        registerError = <p style={{ 'color': 'red' }}><small>{error?.message || updateError?.message}</small></p>
    }
    return (
        <div>
            <h2 className='login-heading'>Register</h2>
            <form onSubmit={handleCreateNewUSer} className='login-container' >
                <input type="text" name='name' placeholder='Your name' required /> <br /> <br />
                <input type="email" name='email' placeholder='Your email' required /> <br /> <br />
                <input type="password" name='password' placeholder='Your password' required /> <br /> <br />
                <p style={{ 'color': 'red' }}><small>{errorMessage}</small></p>
                {registerError}
                <input className='submit-btn' type="submit" value='Register' />
            </form>
            <p>Already have an account? <Link to='/login'>Please login</Link></p>
        </div>
    );
};

export default Register;