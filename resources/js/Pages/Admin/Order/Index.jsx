import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TableOrder } from '@/Pages/Admin/Order/Partials/TableOrder';

export default function Index() {

    const { orders } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Orders" />
            <TableOrder orders={orders} />
        </AuthenticatedLayout>
    );
}
