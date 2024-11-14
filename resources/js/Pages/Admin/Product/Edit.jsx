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
import React from 'react';
import { router } from '@inertiajs/react'


export default function Edit({ product, categories }) {

    const { data, setData, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        status: product.status,
        category_id: product.category_id,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('product.update', product.id), {
            ...data,
            _method: 'put',
        });
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />

            <Card shadow={false} className="bg-white p-4">
                <Typography variant="h4" color="blue-gray">
                    Edit Product
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Update the fields below to edit the product.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Input
                            label='Name'
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
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
                            label='Description'
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            size="lg"
                            placeholder="Ex: Eletrônicos"
                            autoComplete="description"
                            required
                        />
                        {errors.description && (
                            <Typography variant="small" color="red">
                                {errors.description}
                            </Typography>
                        )}
                        <Input
                            label='Price'
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            size="lg"
                            placeholder="Ex: Eletrônicos"
                            autoComplete="price"
                            required
                        />
                        {errors.price && (
                            <Typography variant="small" color="red">
                                {errors.price}
                            </Typography>
                        )}

                        <Select
                            label="Select Status"
                            value={data.status || ''}
                            onChange={(value) => setData('status', value)}
                        >
                            <Option value="Enable">Enable</Option>
                            <Option value="Disable">Disable</Option>
                        </Select>
                        {errors.status && (
                            <Typography variant="small" color="red">
                                {errors.status}
                            </Typography>
                        )}
                        <Select
                            label="Select Category"
                            value={data.category_id || ''}
                            onChange={(value) => setData('category_id', value)}
                        >
                            {categories.map((category) => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                        {errors.category_id && (
                            <Typography variant="small" color="red">
                                {errors.category_id}
                            </Typography>
                        )}
                        {product.image && (
                            <img
                                src={`/storage/${product.image}`}
                                alt="product Image"
                                className="h-32 w-32 object-cover"
                            />
                        )}
                        <Input
                            type="file"
                            label="Image"
                            onChange={(e) => setData('image', e.target.files[0])}
                        />
                        {errors.image && (
                            <Typography variant="small" color="red">
                                {errors.image}
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
