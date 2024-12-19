import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Edit({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user?.name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: '',
        password_confirmation: '',
        role: user?.roles[0]?.name || '',
    });

    const submit = (e) => {
        e?.preventDefault();
        put(`/admin/usuarios/${user?.id}`);
    };
    console.log('user', user);
    return (
        <AuthenticatedLayout>
            <Head title="Editar usuário" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Editar usuário"
                    description="Complete os campos abaixo para editar um novo usuário."
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
                    user={user}
                    roles={roles}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
