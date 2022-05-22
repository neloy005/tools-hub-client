import React, { useRef } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const ResetPassword = () => {
    const emailRef = useRef('');
    const [
        sendPasswordResetEmail,
    ] = useSendPasswordResetEmail(auth);

    const resetPassword = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        toast.success('Passsword Reset Email sent');

    }
    return (
        <div style={{ 'minHeight': '550px' }}>
            <h2 className='login-heading'>Enter your email to reset the password:</h2>

            <form className='login-container' onSubmit={resetPassword}>
                <input type="email" name='email' placeholder='Your Email' ref={emailRef} /> <br /> <br />
                <input className='submit-btn' type="submit" value="Send reset email" />
            </form>
        </div>
    );
};

export default ResetPassword;