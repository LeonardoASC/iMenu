import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Create({ categoriesEnable }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        status: '',
        category_id: '',
        image: null,
    });

    const submit = (e) => {
        e?.preventDefault();
        post('/product', {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Product" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Create Product"
                    description="Create a new product"
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    handleSubmit={submit}
                    categoriesEnable={categoriesEnable}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
