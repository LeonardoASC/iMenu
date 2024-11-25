import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TableTable } from './Partials/TableTable';

export default function Index() {

    const { tables } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <TableTable tables={tables} />
        </AuthenticatedLayout>
    );
}