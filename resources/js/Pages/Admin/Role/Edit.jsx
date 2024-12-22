import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import FormAbilities from './Partials/FormAbilities';
import CardHeader from './Partials/CardHeader';
import Form from './Partials/Form';

export default function Edit({ role }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role?.name || '',
        title: role?.title || '',
    });

    const submit = (e) => {
        e?.preventDefault();
        put(route('admin.roles.update', role.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Editar cargo" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Editar cargo"
                    description="Complete os campos abaixo para editar um cargo."
                    isEdit={true}
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    handleSubmit={submit}
                    isEdit={true}
                    role={role}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
