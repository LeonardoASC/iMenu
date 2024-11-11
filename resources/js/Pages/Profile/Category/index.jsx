import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/inertia-react';


export default function Index() {

    const { categories } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <h1>Categorias</h1>
            <ul>
                {categories.data.map((category) => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>


        </AuthenticatedLayout>
    );
}
