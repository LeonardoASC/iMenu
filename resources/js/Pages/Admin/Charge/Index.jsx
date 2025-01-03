import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { TableCharge } from '@/Pages/Admin/Charge/Partials/TableCharge';

export default function Index() {

    const { charges } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Charges" />
            <TableCharge charges={charges} />
        </AuthenticatedLayout>
    );
}
