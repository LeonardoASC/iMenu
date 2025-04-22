import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Show({ category }) {
    const { data, setData, post, processing, errors } = useForm({
        name: category?.name || '',
        image: category?.image || '',
        status: category?.status || '',
    });

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Show Category"
                    description="Below you will be able to view image, name and status."
                />
                <Form
                    data={data}
                    setData={setData}
                    isShow={true}
                    category={category}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
