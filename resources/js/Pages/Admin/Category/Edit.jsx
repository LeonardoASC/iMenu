import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
    Typography
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';

export default function Edit({ category }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: category?.name || '',
        image: null,
        status: category.status || '',
    });

    const submit = (e) => {
        e?.preventDefault();
        post(`/category/${category?.id}`, {
            forceFormData: true,
        });
    };

    if (!category) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit Category" />

            <Card shadow={false} className="bg-white p-4">
                <Typography variant="h4" color="blue-gray">
                    Edit Category
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Update the fields below to edit the category.
                </Typography>
                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    handleSubmit={submit}
                    isEdit={true}
                    category={category}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
