import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TableUser } from './Partials/TableUser';

export default function Index() {
    const { users } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Usuários" />
            <TableUser users={users} />
        </AuthenticatedLayout>
    );
}
