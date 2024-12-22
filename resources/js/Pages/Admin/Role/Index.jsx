import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Table } from './Partials/Table';

export default function Index(props) {
    const { roles } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Cargos e permissões" />
            <Table roles={roles} />
        </AuthenticatedLayout>
    );
}
