import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';

const AllUsers = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://enigmatic-wildwood-66605.herokuapp.com/users', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    //...............................................
    //Make a new admin
    //...............................................
    const handleMakingAdmin = (email) => {
        fetch(`https://enigmatic-wildwood-66605.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to make an admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success('Promotrd as admin successfully!');
                }

            })
    }
    return (
        <div>
            <h2>All users: {users.length}</h2>
            <Table responsive striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Make Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) =>
                            <tr
                                key={user._id}
                            >
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>{
                                    user.role !== 'admin' && <Button onClick={() => handleMakingAdmin(user.email)} variant="primary" size="sm">
                                        Make Admin
                                    </Button>
                                }</td>
                            </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default AllUsers;