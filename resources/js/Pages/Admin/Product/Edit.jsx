import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card } from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';


export default function Edit({ product, categories }) {

    const { data, setData, processing, errors, post } = useForm({
        _method: 'put',
        name: product.name,
        description: product.description,
        price: product.price,
        status: product.status,
        category_id: product.category_id,
        image: null,
    });

    const submit = (e) => {
        e?.preventDefault()
        post(`/admin/product/${product.id}`, {
            forceFormData: true,
        });
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />

            <Card shadow={false} className="bg-white p-4">
                <CardHeader
                    title="Edit Product"
                    description="Edit a product"
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    handleSubmit={submit}
                    isEdit={true}
                    product={product}
                    categoriesEnable={categories}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
