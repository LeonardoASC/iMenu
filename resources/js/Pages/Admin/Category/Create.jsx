import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
    Typography,
} from "@material-tailwind/react";
import React, { useRef } from 'react';
import Form from './Partials/Form';

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        image: null,
        status: '',
    });

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) { setData('image', file)}
    };

    const handleStatusChange = (value) => {setData('status', value)};

    const submit = (e) => {
        e?.preventDefault();
        post('/category', {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Category" />

            <Card shadow={false} className="bg-white p-4">
                <Typography variant="h4" color="blue-gray">
                    Create a Category
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Below you will need to provide image, name, and status.
                </Typography>
                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    handleSubmit={submit}
                    handleButtonClick={handleButtonClick}
                    handleFileChange={handleFileChange}
                    handleStatusChange={handleStatusChange}
                    fileInputRef={fileInputRef}
                    // category={category}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
