import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Option,
    Select
} from "@material-tailwind/react";
import React, { useRef, useState, useEffect } from 'react';



export default function Create() {

    const [imageName, setImageName] = useState('');
    const fileInputRef = useRef(null);

    const handleButtonClick = () => { fileInputRef.current.click()};

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) { setImageName(file.name) }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Profile" />

            <Card shadow={false} className="bg-white p-4">
                <Typography variant="h4" color="blue-gray">
                    Create a Category
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Below you will need to provide image, name, status.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Image
                        </Typography>
                        <div className="relative flex w-full max-w-[24rem]">
                            <Input
                                type="text"
                                label="Image"
                                value={imageName}
                                readOnly
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!border-t-blue-gray-200 focus:!border-t-gray-900",
                                }}
                            />
                            <Button
                                size="sm"
                                color={imageName ? "blue" : "gray"}
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

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Status
                        </Typography>
                        <Select
                            label="Select Status"
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 25 },
                            }}
                        >
                            <Option>Enable</Option>
                            <Option>Disable</Option>
                        </Select>
                    </div>

                    <Button className="mt-6" fullWidth>
                        ADD
                    </Button>
                </form>
            </Card>


        </AuthenticatedLayout>
    );
}
