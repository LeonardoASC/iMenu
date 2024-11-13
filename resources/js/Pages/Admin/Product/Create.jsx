import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Description } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
    Input,
    Button,
    Typography,
    Option,
    Select
} from "@material-tailwind/react";
import React, { useRef } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        status: '',
        image: null,
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
        e.preventDefault();
        post(route('product.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Product" />

            <Card shadow={false} className="bg-white p-4">
                <Typography variant="h4" color="blue-gray">
                    Create a Product
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Below you will need to provide name, description, price, status and image of the product.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            size="lg"
                            placeholder="Ex: Eletrônicos"
                            autoComplete="name"
                            required
                        />
                        <Typography variant="small" color="red">{errors.name}</Typography>

                        <Input
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            size="lg"
                            placeholder="Ex: Eletrônicos"
                            autoComplete="description"
                            required
                        />
                        <Typography variant="small" color="red">{errors.description}</Typography>

                        <Input
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            size="lg"
                            placeholder="Ex: Eletrônicos"
                            autoComplete="price"
                            required
                        />
                        <Typography variant="small" color="red">{errors.price}</Typography>

                        <Select
                            label="Select Status"
                            onChange={(e) => handleStatusChange(e)}
                        >
                            <Option value="Enable">Enable</Option>
                            <Option value="Disable">Disable</Option>
                        </Select>
                        <Typography variant="small" color="red">{errors.status}</Typography>

                        <div className="relative flex w-full max-w-[24rem]">
                            <Input
                                type="text"
                                label="Image"
                                value={data.image ? data.image.name : ''}
                                readOnly
                            />
                            <Button
                                size="sm"
                                color={data.image ? "blue" : "gray"}
                                onClick={handleButtonClick}
                                className="!absolute right-1 top-1 rounded"
                            >
                                Select Image
                            </Button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <Typography variant="small" color="red">{errors.image}</Typography>
                    </div>

                    <Button className="mt-6" type="submit" disabled={processing} fullWidth>
                        ADD
                    </Button>
                </form>
            </Card>
        </AuthenticatedLayout>
    );
}
