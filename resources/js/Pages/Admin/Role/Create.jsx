import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
    Typography,
} from "@material-tailwind/react";
import React from 'react';
import Form from './Partials/Form';
import CardHeader from './Partials/CardHeader';

export default function Create(props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        title: '',
    });

    const submit = (e) => {
        e?.preventDefault()
        post('/admin/cargos');
    }

    return (
        <AuthenticatedLayout>
            <Head title="Cadastrar Cargo" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Cadastrar Cargo"
                    description="Complete os campos abaixo para cadastrar um novo cargo."
                />
                <hr className="mt-4" />
                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    handleSubmit={submit}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
