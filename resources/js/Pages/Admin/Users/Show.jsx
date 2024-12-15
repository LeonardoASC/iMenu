import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Show({ table }) {
    const { data, setData, post, processing, errors } = useForm({
        number: table?.number || '',
        establishment_id: table?.establishment_id || '',
        type: table?.type || '',
        status: table?.status || '',
        qrcode: table?.qrcode || '',
    });

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Show table"
                    description="Below you will be able to view image, name and status."
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    isShow={true}
                    table={table}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
