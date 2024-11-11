import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Index() {
    return (
        <AuthenticatedLayout

        >
            <Head title="Profile" />

            <div className="py-12">

            </div>
        </AuthenticatedLayout>
    );
}
