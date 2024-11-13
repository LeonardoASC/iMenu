import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Index() {
    const { orders } = usePage().props;

    // Acesse os dados da chave 'data' que contém os pedidos
    const orderData = orders.data;

    console.log(orderData); // Verifique a estrutura dos dados de pedidos no console

    return (
        <AuthenticatedLayout>
            <Head title="Orders" />
            <div>
                <h1>Orders</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>user_id</th>
                            <th>Status</th>
                            <th>Notes</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(orderData) && orderData.length > 0 ? (
                            orderData.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.user_id}</td>
                                    <td>{order.status}</td>
                                    <td>{order.notes}</td>
                                    <td>{order.total}</td>
                                    <td>
                                        <a href="#">View</a>
                                        <a href="#">Edit</a>
                                        <a href="#">Delete</a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No orders available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
