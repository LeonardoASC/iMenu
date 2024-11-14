import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

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
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Edit Category"
                    description="Fill in the fields below to edit a category."
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
                    category={category}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
