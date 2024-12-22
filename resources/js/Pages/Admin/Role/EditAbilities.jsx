import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    Card,
} from "@material-tailwind/react";
import React from 'react';
import FormAbilities from './Partials/FormAbilities';
import CardHeader from './Partials/CardHeader';

export default function EditAbilities( props ) {
    const { data, setData, put, processing, errors } = useForm({
        name: props?.role?.name || '',
        title: props?.role?.title || '',
        abilities: props?.role?.abilities.map((ability) => ability?.id),
    });

    const submit = (e) => {
        e?.preventDefault();
        put(route('admin.roles.assignAbilitiesToRole',  props?.role.id));
    };
    console.log('props', props);
    return (
        <AuthenticatedLayout>
            <Head title="Editar permissões" />
            <Card className="bg-white p-4 shadow-xl">
                <CardHeader
                    title="Editar permissões"
                    isEdit={true}
                />
                <hr className="mt-4" />
                <FormAbilities
                    handleSubmit={submit}
                    data={data}
                    setData={setData}
                    errors={errors}
                    abilities={props?.abilities}
                    processing={processing}
                />
            </Card>
        </AuthenticatedLayout>
    );
}
