import React, { useRef, useState } from 'react';
import {
    Input,
    Button,
    Option,
    Select
} from "@material-tailwind/react";
import { Link } from '@inertiajs/react';

export default function Form({ data, setData, errors, processing = false, handleSubmit, isShow = false, isEdit = false, charge }) {

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

                    <Input
                        id="value"
                        name="value"
                        label="value"
                        value={data?.value}
                        onChange={(e) => setData('value', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.value}
                        size="lg"
                        placeholder="Ex: Eletrônicos"
                        autoComplete="value"
                        disabled={isShow}

                    />
                    {errors?.value && <span className="text-red-500">{errors.value}</span>}

                    <Input
                        id="description"
                        name="description"
                        label="description"
                        value={data?.description}
                        onChange={(e) => setData('description', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.description}
                        size="lg"
                        placeholder="Ex: Eletrônicos"
                        autoComplete="description"
                        disabled={isShow}

                    />
                    {errors?.description && <span className="text-red-500">{errors.description}</span>}

                    <Select
                        label="Select Type"
                        required={!isEdit}
                        value={data.type || 'Service Charge'}
                        onChange={(value) => setData('type', value)}
                        disabled={isShow}
                    >
                        <Option value="Service Charge">Service Charge</Option>
                        <Option value="Cover Charge">Cover Charge</Option>
                        <Option value="Gratuity">Gratuity</Option>
                        <Option value="Corkage Fee">Corkage Fee</Option>
                        <Option value="Reservation Fee">Reservation Fee</Option>
                        <Option value="Cancellation Fee">Cancellation Fee</Option>
                    </Select>
                    {errors?.type && <span className="text-red-500">{errors.type}</span>}

                    <Select
                        label="Select is optional"
                        required={!isEdit}
                        value={data.is_optional || "1"}
                        onChange={(value) => setData('is_optional', value)}
                        disabled={isShow}
                    >
                        <Option value="1">Yes</Option>
                        <Option value="0">No</Option>
                    </Select>
                    {errors?.is_optional && <span className="text-red-500">{errors.is_optional}</span>}

                    <Select
                        label="Select status"
                        required={!isEdit}
                        value={data.status || 'Enable'}
                        onChange={(value) => setData('status', value)}
                        disabled={isShow}
                    >
                        <Option value="Enable">Enable</Option>
                        <Option value="Disable">Disable</Option>
                    </Select>
                    {errors?.status && <span className="text-red-500">{errors.status}</span>}

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
                        <Link href={route('charges.edit', charge.id)} className="w-full">
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
