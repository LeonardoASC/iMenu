import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TableCategory } from '@/Pages/Admin/Category/Partials/TableCategory';


export default function Index() {

    const { categories } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <TableCategory categories={categories} />
        </AuthenticatedLayout>
    );
}
