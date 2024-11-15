import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TableEstablishment } from '@/Pages/Admin/Establishment/Partials/TableEstablishment';

export default function Index() {

    const { establishments } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <TableEstablishment establishments={establishments} />
        </AuthenticatedLayout>
    );
}
