import React, { useRef, useState } from 'react';
import {
    Input,
    Button,
    Option,
    Select
} from "@material-tailwind/react";
import { Link } from '@inertiajs/react';

export default function Form({ data, setData, errors, processing = false, handleSubmit, isShow = false, isEdit = false, table }) {

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
                        id="establishment_id"
                        name="establishment_id"
                        label="Establishment ID"
                        value={data?.establishment_id}
                        onChange={(e) => setData('establishment_id', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.establishment_id}
                        size="lg"
                        placeholder="Ex: Eletrônicos"
                        autoComplete="establishment_id"
                        disabled={isShow}
                    />
                    {errors?.establishment_id && <span className="text-red-500">{errors.establishment_id}</span>}
                    <Input
                        id="number"
                        name="number"
                        label="Number of table"
                        value={data?.number}
                        onChange={(e) => setData('number', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.number}
                        size="lg"
                        placeholder="Ex: Eletrônicos"
                        autoComplete="number"
                        disabled={isShow}
                    />
                    {errors?.number && <span classnumber="text-red-500">{errors.number}</span>}

                    <Select
                        label="Select type"
                        required={!isEdit}
                        value={data.type || 'common'}
                        onChange={(value) => setData('type', value)}
                        disabled={isShow}
                    >
                        <Option value="common">Common</Option>
                        <Option value="vip">Vip</Option>
                    </Select>
                    {errors?.type && <span className="text-red-500">{errors.type}</span>}

                    <Select
                        label="Select status"
                        required={!isEdit}
                        value={data.status || 'free'}
                        onChange={(value) => setData('status', value)}
                        disabled={isShow}
                    >
                        <Option value="free">Free</Option>
                        <Option value="busy">Busy</Option>
                        <Option value="reserved">Reserved</Option>
                    </Select>
                    {errors?.status && <span className="text-red-500">{errors.status}</span>}

                    <Input
                        id="qrcode"
                        name="qrcode"
                        label="Qrcode of table"
                        value={data?.qrcode}
                        onChange={(e) => setData('qrcode', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.qrcode}
                        size="lg"
                        placeholder="Ex: Eletrônicos"
                        autoComplete="qrcode"
                        disabled={isShow}
                    />
                    {errors?.qrcode && <span classqrcode="text-red-500">{errors.qrcode}</span>}

                    {/* {!isShow && (
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
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                required={!isEdit}
                            />
                        </div>
                    )}
                    {errors?.image && <span className="text-red-500">{errors.image}</span>}

                    {table?.image && (
                        <div className="border-2 border-gray-500 p-2 rounded-lg border-dotted">
                            <img
                                // src={`/storage/${table.image}`}
                                src={imageName ? URL.createObjectURL(data.image) : `/storage/${table.image}`}
                                alt="table Image"
                                className="h-32 w-32 rounded-3xl object-cover"
                            />
                        </div>
                    )} */}
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
                        <Link href={route('table.edit', table.id)} className="w-full">
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
