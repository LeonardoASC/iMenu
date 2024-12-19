import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Show({ user }) {
    return (
        <AuthenticatedLayout>
            <Head title="Vsiualizar usuário" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Vsiualizar usuário"
                />
                <hr className="mt-4" />
                <Form
                    data={user}
                    user={user}
                    isShow={true}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
