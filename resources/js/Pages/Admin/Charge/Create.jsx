import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
    Typography,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        value: '',
        description: '',
        type: '',
        is_optional: '',
        status: '',
    });

    const submit = (e) => {
        e?.preventDefault();
        post('/admin/charges', {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Charges" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Create Charges"
                    description="Fill in the fields below to create a new Charges."
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    handleSubmit={submit}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
