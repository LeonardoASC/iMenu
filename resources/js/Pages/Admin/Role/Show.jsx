import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import CardHeader from './Partials/CardHeader';
import FormAbilities from './Partials/FormAbilities';

export default function Show({ role, abilities }) {
    const { data } = useForm({
        name: role?.name || '',
        title: role?.title || '',
        abilities: role?.abilities?.map((ability) => ability?.id),
    });

    return (
        <AuthenticatedLayout>
            <Head title="Vsiualizar cargo" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Vsiualizar cargo"
                />
                <hr className="mt-4" />
                <FormAbilities
                    data={data}
                    abilities={abilities}
                    isSHow={true}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
