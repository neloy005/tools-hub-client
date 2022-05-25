import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import './MyProfile.css';

const MyProfile = () => {
    const [user] = useAuthState(auth);

    const { data: userInfo, isLoading, refetch } = useQuery(['users', user], () => fetch(`http://localhost:5000/user?email=${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(user);

    const updateMyProfile = (event) => {
        event.preventDefault();
        const fullName = event.target.name.value;
        const location = event.target.location.value;
        const phone = event.target.phone.value;
        const education = event.target.education.value;
        const linkedln = event.target.linkedln.value;

        const myProfile = { fullName, education, location, phone, linkedln };
        console.log(myProfile);

        fetch(`http://localhost:5000/user/${user.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(myProfile)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
                toast.success('Your info updated successfully!')
            })
    }
    return (
        <div style={{ 'minHeight': '650px' }}>
            <h2>Profile of: {user.displayName}</h2>
            <p>Email: {userInfo.email}</p>
            <div className='user-info'>
                <div className='personal-info'>

                    <h2>Full Name: {userInfo?.fullName ? <span>{userInfo?.fullName}</span> : 'Not set yet'}</h2>
                    <h2>Location: {userInfo?.location ? <span>{userInfo?.location}</span> : 'Not set yet'}</h2>
                    <h2>Education: {userInfo?.education ? <span>{userInfo?.education}</span> : 'Not set yet'}</h2>
                    <h2>Phone: {userInfo?.phone ? <span>{userInfo?.phone}</span> : 'Not set yet'}</h2>
                    <h2>Linkedln: {userInfo?.linkedln ? <span>{userInfo?.linkedln}</span> : 'Not set yet'}</h2>
                </div>
                <div onSubmit={updateMyProfile} className='user-info-input'>
                    <h2>Update your info:</h2>
                    <form className='login-container'>
                        <input type="text" name='name' placeholder='Type full name' required /> <br /> <br />
                        <input type="text" name='location' placeholder='Your location' required /> <br /> <br />
                        <input type="text" name='education' placeholder='Your education' required /> <br /> <br />
                        <input type="number" name='phone' placeholder='Phone no' required /> <br /> <br />
                        <input type="text" name='linkedln' placeholder='Your linkedln' required /> <br /> <br />
                        <input className='submit-btn' type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;