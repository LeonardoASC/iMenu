import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Edit({ table }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        number: table?.number || '',
        establishment_id: table?.number || '',
        type: table?.type || '',
        status: table?.status || '',
        qrcode: table?.qrcode || '',
    });

    const submit = (e) => {
        e?.preventDefault();
        post(`/admin/table/${table?.id}`, {
            forceFormData: true,
        });
    };

    if (!table) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit table" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Edit table"
                    description="Fill in the fields below to edit a table."
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
                    table={table}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
