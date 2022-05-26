import { Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import SingleOrder from '../SingleOrder/SingleOrder';

const ManageAllOrders = () => {
    //.....................................
    //Get all the order info from db
    //.....................................
    const { data: orders, isLoading, refetch } = useQuery('users', () => fetch('https://enigmatic-wildwood-66605.herokuapp.com/orders', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div style={{ 'minHeight': '650px' }}>
            <h2>Total {orders.length} orders on the list</h2>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Buyer</th>
                        <th>Tool Name</th>
                        <th>Quantity</th>
                        <th>To pay</th>
                        <th>Unpaid/Pending</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => <SingleOrder
                            key={order._id}
                            index={index + 1}
                            order={order}
                            orders={orders}
                            refetch={refetch}
                        ></SingleOrder>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default ManageAllOrders;