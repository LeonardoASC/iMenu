import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Show({ charge }) {
    const { data, setData, post, processing, errors } = useForm({
        name: charge?.name || '',
        value: charge?.value || '',
        description: charge?.description || '',
        type: charge?.type ||  '',
        is_optional: charge?.is_optional ?? 1,
        status: charge?.status || '',
    });

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Show Charge"
                    description="Below you will be able to view image, name and status."
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    isShow={true}
                    charge={charge}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
