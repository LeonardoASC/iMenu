import React, { useState } from 'react';
import {
    Input,
    Button,
    Option,
    Select
} from "@material-tailwind/react";

export default function Form({ data, setData, errors, processing = false, handleSubmit, isShow = false, isEdit = false }) {
    return (
        <div>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
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
                    />
                    {errors?.name && <span className="text-red-500">{errors.name}</span>}

                    <input
                        type="file"
                        onChange={(e) => setData('image', e.target.files[0])}
                        required={!isEdit}
                        error={errors?.image}
                    />
                    {errors?.image && <span className="text-red-500">{errors.image}</span>}

                    <Select
                        label="Select Status"
                        required={!isEdit}
                        value={data.status || 'Enable'} 
                        onChange={(value) => setData('status', value)}
                    >
                        <Option value="Enable">Enable</Option>
                        <Option value="Disable">Disable</Option>
                    </Select>
                    {errors?.status && <span className="text-red-500">{errors.status}</span>}
                </div>

                <Button className="mt-6" type="submit" disabled={processing} fullWidth>
                    {isEdit ? 'Update' : 'Create'}
                </Button>
            </form>
        </div>
    );
}
