import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Edit({ establishment }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: establishment?.name || '',
        address: establishment?.address || '',
        phone: establishment?.phone || '',
        email: establishment?.email || '',
        logo_path: null,

    });

    const submit = (e) => {
        e?.preventDefault();        
        post(`/admin/establishment/${establishment?.id}`, {
            forceFormData: true,
        });
    };

    if (!establishment) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit establishment" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Edit establishment"
                    description="Fill in the fields below to edit a establishment."
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
                    establishment={establishment}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
