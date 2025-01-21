import React from 'react';
import {
    Input,
    Button,
} from "@material-tailwind/react";
import { Link } from '@inertiajs/react';

export default function Form({ data, setData, errors, processing = false, handleSubmit, isShow = false, isEdit = false, role }) {

    return (
        <div>
            <form className={`mt-4 mb-2 sm:w-96 ${isShow && 'md:w-full'}`} onSubmit={handleSubmit}>
                <div className={`mb-1 flex ${!isShow ? 'flex-col' : ''} gap-6`}>
                    <Input
                        id="name"
                        name="name"
                        label="Nome"
                        value={data?.name}
                        onChange={(e) => setData('name', e?.target?.value)}
                        error={errors?.name}
                        size="lg"
                        autoComplete="name"
                        disabled={isEdit || isShow}
                    />
                    {errors?.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    <Input
                        id="title"
                        name="title"
                        label="Cargo"
                        value={data?.title}
                        onChange={(e) => setData('title', e?.target?.value)}
                        required={!isShow}
                        error={errors?.title}
                        size="lg"
                        autoComplete="title"
                        disabled={isShow}
                    />
                </div>

                {!isShow && <div className="mt-4 flex gap-2">
                    <Link href={route('admin.roles.index')}>
                        <Button>Voltar</Button>
                    </Link>
                    {!isShow && (
                        <Button className="" type="submit" disabled={processing} fullWidth>
                            {isEdit ? 'Salvar' : 'Cadastrar'}
                        </Button>
                    )}
                    {isEdit && (
                        <Link href={route('admin.roles.edit', role?.id)} className="w-full">
                            <Button fullWidth>
                                Editar
                            </Button>
                        </Link>
                    )}
                </div>}
            </form>
        </div>
    );
}
