import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TableProduct } from '@/Components/TableProduct';


export default function Index() {

    const { products } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <TableProduct products={products} />
        </AuthenticatedLayout>
    );
}