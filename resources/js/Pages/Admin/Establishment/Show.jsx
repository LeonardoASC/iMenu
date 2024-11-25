import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Show({ establishment }) {
    const { data, setData, post, processing, errors } = useForm({
        name: establishment?.name || '',
        address: establishment?.address || '', 
        phone: establishment?.phone || '',
        email: establishment?.email || '',
        logo_path: establishment?.logo_path || '',
    });
    console.log(establishment);
    

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Show Establishment"
                    description="Below you will be able to view image, name and status."
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    isShow={true}
                    establishment={establishment}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
