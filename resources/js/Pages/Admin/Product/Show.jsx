import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Show({ product, categoriesEnable }) {
    const { data, setData, post, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        status: product?.status || '',
        category_id: product?.category_id || '',
        image: product?.image || '',
    });

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Show Product"
                    description="Below you will be able to view image, name, description, price, status and category."
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    isShow={true}
                    product={product}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
