import React, { useEffect, useRef, useState } from 'react';
import {
    Input,
    Button,
    Option,
    Select
} from "@material-tailwind/react";
import { Link } from '@inertiajs/react';

export default function Form({ data, setData, errors, processing = false, handleSubmit, isShow = false, isEdit = false, product, categoriesEnable = [] }) {

    const [imageName, setImageName] = useState('');
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageName(file.name);
            setData('image', file);
        }
    };

    return (
        <div>
            <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                    <Input
                        id="name"
                        name="name"
                        label="Name"
                        value={data?.name}
                        onChange={(e) => setData('name', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.name}
                        size="lg"
                        placeholder="Ex: Eletrônicos"
                        autoComplete="name"
                        disabled={isShow}

                    />
                    {errors?.name && <span className="text-red-500">{errors.name}</span>}

                    {/* input de descrição */}
                    <Input
                        id="description"
                        name="description"
                        label="Description"
                        value={data?.description}
                        onChange={(e) => setData('description', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.description}
                        size="lg"
                        placeholder="Ex: Produtos eletrônicos"
                        autoComplete="description"
                        disabled={isShow}
                    />
                    {errors?.description && <span className="text-red-500">{errors.description}</span>}

                    {/* input de preço */}
                    <Input
                        id="price"
                        name="price"
                        label="Price"
                        value={data?.price}
                        onChange={(e) => setData('price', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.price}
                        size="lg"
                        placeholder="Ex: 100.00"
                        autoComplete="price"
                        disabled={isShow}
                    />
                    {errors?.price && <span className="text-red-500">{errors.price}</span>}

                    {/* select de categoria */}
                    <Select
                        label="Select Category"
                        required={!isEdit}
                        value={data.category_id || ''}
                        onChange={(value) => setData('category_id', value)}
                        disabled={isShow}
                    >
                        {isShow ? (
                            product?.category ? (
                                <Option key={product.category.id} value={product.category.id}>
                                    {product.category.name}
                                </Option>
                            ) : (
                                <Option disabled>No category associated</Option>
                            )
                        ) : (
                            categoriesEnable.map((category) => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))
                        )}
                    </Select>
                    {errors?.category_id && <span className="text-red-500">{errors.category_id}</span>}


                    <Select
                        label="Select Status"
                        required={!isEdit}
                        value={data.status || 'Enable'}
                        onChange={(value) => setData('status', value)}
                        disabled={isShow}
                    >
                        <Option value="Enable">Enable</Option>
                        <Option value="Disable">Disable</Option>
                    </Select>
                    {errors?.status && <span className="text-red-500">{errors.status}</span>}

                    {!isShow && (
                        <div className="relative flex w-full max-w-[24rem]">
                            <Input
                                type="text"

                                value={imageName ? imageName : 'Selecionar imagem'}
                                onChange={(e) => setImageName(e.target.value)}
                                className="pr-20"
                                containerProps={{
                                    className: "min-w-0",
                                }}
                                readOnly
                            />
                            <Button
                                size="sm"
                                color="blue-gray"
                                className="!absolute right-1 top-1 rounded"
                                onClick={handleButtonClick}
                            >
                                Selecionar imagem
                            </Button>
                            <input
                                type="file"
                                name="image" 
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                required={!isEdit}
                            />
                        </div>
                    )}
                    {errors?.image && <span className="text-red-500">{errors.image}</span>}

                    {product?.image && (
                        <div className="border-2 border-gray-500 p-2 rounded-lg border-dotted">
                            <img
                                // src={`/storage/${product.image}`}
                                src={imageName ? URL.createObjectURL(data.image) : `/storage/${product.image}`}
                                alt="product Image"
                                className="h-32 w-32 rounded-3xl object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-4 flex gap-2">
                    <Button
                        className=""
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                    {!isShow && (
                        <Button className="" type="submit" disabled={processing} fullWidth>
                            {isEdit ? 'Update' : 'Create'}
                        </Button>
                    )}
                    {isShow && (
                        <Link href={route('product.edit', product.id)} className="w-full">
                            <Button fullWidth>
                                Editar
                            </Button>
                        </Link>
                    )}
                </div>
            </form>
        </div>
    );
}
