import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    console.log(user);
    return (
        <div style={{ 'minHeight': '650px' }}>
            <h2>Profile of: {user.displayName}</h2>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default MyProfile;