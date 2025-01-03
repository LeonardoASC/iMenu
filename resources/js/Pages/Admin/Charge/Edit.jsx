import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Edit({ charge }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: charge?.name || '',
        value: charge?.value || '',
        description: charge?.description || '',
        type: charge?.type ||  '',
        is_optional: charge?.is_optional || '',
        status: charge?.status || '',
    });

    const submit = (e) => {
        e?.preventDefault();
        post(`/admin/charges/${charge?.id}`, {
            forceFormData: true,
        });
    };

    if (!charge) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit Charge" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Edit Charge"
                    description="Fill in the fields below to edit a charge."
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
                    charge={charge}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
