import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TableOrderProducts } from '@/Pages/Admin/OrderProduct/Partials/TableOrderProducts';

export default function Index({ orderProducts }) {

    return (
        <AuthenticatedLayout>
            <Head title="Order Products" />
            <TableOrderProducts orderProducts={orderProducts} /> 
        </AuthenticatedLayout>
    );
}
