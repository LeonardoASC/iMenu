import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
    Input,
    Button,
    Typography,
    Option,
    Select
} from "@material-tailwind/react";
import React, { useState } from 'react';
import { router } from '@inertiajs/react'

export default function Edit({ category }) {

    const { data, setData, processing, errors } = useForm({
        name: category.name,
        image: null,
        status: category.status,
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('category.update', category.id), {
            ...data,
            _method: 'put',
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
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Input
                            id="name"
                            name="name"
                            value={data.name} // Mudança aqui
                            onChange={(e) => setData('name', e.target.value)} // Mudança aqui
                            size="lg"
                            placeholder="Ex: Eletrônicos"
                            autoComplete="name"
                            required
                        />
                        {errors.name && (
                            <Typography variant="small" color="red">
                                {errors.name}
                            </Typography>
                        )}

                        <Input
                            type="file"
                            label="Image"
                            onChange={(e) => setData('image', e.target.files[0])} // Mudança aqui
                        />


                        {errors.image && (
                            <Typography variant="small" color="red">
                                {errors.image}
                            </Typography>
                        )}

                        <Select
                            label="Select Status"
                            value={data.status || ''} // Mudança aqui
                            onChange={(value) => setData('status', value)} // Mudança aqui
                        >
                            <Option value="Enable">Enable</Option>
                            <Option value="Disable">Disable</Option>
                        </Select>


                        {errors.status && (
                            <Typography variant="small" color="red">
                                {errors.status}
                            </Typography>
                        )}
                    </div>

                    <Button className="mt-6" type="submit" disabled={processing} fullWidth>
                        UPDATE
                    </Button>
                </form>
            </Card>
        </AuthenticatedLayout>
    );
}
