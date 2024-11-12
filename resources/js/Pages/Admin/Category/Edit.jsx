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
import React, { useRef } from 'react';

export default function Edit({ category }) {
    
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        image: null,
        status: category.status || '',
    });

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) { setData('image', file) } 
    };

    const handleStatusChange = (value) => { setData('status', value) };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('status', data.status);
    
        if (data.image instanceof File) { // Apenas incluir a imagem se for um novo arquivo
            formData.append('image', data.image);
        }
    
        put(route('category.update', category.id), {
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    };
    
    
     // Renderizar apenas quando os dados estão prontos
     if (!data.name && !data.status && category) {
        return <div>Loading...</div>; // ou qualquer outro tipo de indicador de carregamento
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
                            value={data.name || ''}
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

                        <div className="relative flex w-full max-w-[24rem]">
                            <Input
                                type="text"
                                label="Image"
                                value={data.image ? data.image.name : (category.image ? 'Current Image Selected' : '')}
                                readOnly
                            />
                            <Button
                                size="sm"
                                color={data.image || category.image ? "blue" : "gray"}
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
                        {errors.image && (
                            <Typography variant="small" color="red">
                                {errors.image}
                            </Typography>
                        )}

                        <Select
                            label="Select Status"
                            value={data.status || ''}
                            onChange={(e) => handleStatusChange(e)}
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
