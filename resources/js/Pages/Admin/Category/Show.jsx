import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {
    Card,
    Typography,
} from "@material-tailwind/react";
import React from 'react';

export default function Show({ category }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profile" />
            <Card shadow={false} className="bg-white p-4 w-[50%]">
                <div className="flex justify-between  items-center">
                    <div>
                        <Typography variant="h4" color="blue-gray">
                            Show a Category
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Below you will be able to view image, name and status.
                        </Typography>
                    </div>
                    <div className="">
                        <a href={route('category.edit', category.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a>
                    </div>
                </div>
                <figure className="relative h-96 w-full">
                    <img
                        className="h-[100%] w-auto rounded-xl object-cover object-center"
                        src={category.image}
                        alt="nature image"
                    />
                    <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                {category.name}
                            </Typography>
                            <Typography color="gray" className="mt-2 font-normal">
                                {category.created_at}
                            </Typography>
                        </div>
                        <Typography variant="h5" color="blue-gray">
                            {category.status}
                        </Typography>
                    </figcaption>
                </figure>
            </Card>
        </AuthenticatedLayout>
    );
}
