import React, { useRef, useState } from 'react';
import {
    Input,
    Button,
    Option,
    Select
} from "@material-tailwind/react";
import { Link } from '@inertiajs/react';
import { InputPhone } from '@/Components/InputPhone';
import SelectInput from '@/Components/SelectInput';

export default function Form({ data, setData, errors, processing = false, handleSubmit, isShow = false, isEdit = false, user, roles=[] }) {

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
                        id="name"
                        name="name"
                        label="Nome"
                        value={data?.name}
                        onChange={(e) => setData('name', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.name}
                        size="lg"
                        autoComplete="name"
                        disabled={isShow}
                    />
                    {errors?.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    <Input
                        id="last_name"
                        name="last_name"
                        label="Sobrenome"
                        value={data?.last_name}
                        onChange={(e) => setData('last_name', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.last_name}
                        size="lg"
                        autoComplete="last_name"
                        disabled={isShow}
                    />
                    {errors?.last_name && <span className="text-red-500 text-xs">{errors.last_name}</span>}
                    <Input
                        id="email"
                        name="email"
                        label="Email"
                        type='email'
                        value={data?.email}
                        onChange={(e) => setData('email', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.email}
                        size="lg"
                        autoComplete="email"
                        disabled={isShow}
                    />
                    {errors?.email && <span className="text-red-500 text-xs">{errors.email}</span>}

                    <InputPhone
                        id="phone"
                        name="phone"
                        label="Telefone"
                        value={data?.phone}
                        onChange={(e) => setData('phone', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.phone}
                        size="lg"
                        autoComplete="phone"
                        disabled={isShow}
                    />
                    {errors?.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}

                    <Input
                        id="password"
                        name="password"
                        label="Senha"
                        type='password'
                        placeholder='Senha'
                        value={data?.password}
                        onChange={(e) => setData('password', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.password}
                        size="lg"
                        autoComplete="password"
                        disabled={isShow}
                    />
                    {errors?.password && <span className="text-red-500 text-xs">{errors.password}</span>}

                    <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        label="Confirmar senha"
                        type='password'
                        placeholder='Confirmar senha'
                        value={data?.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e?.target?.value)}
                        required={!isEdit}
                        error={errors?.password_confirmation}
                        size="lg"
                        autoComplete="password_confirmation"
                        disabled={isShow}
                    />
                    {errors?.password_confirmation && <span className="text-red-500 text-xs">{errors.password_confirmation}</span>}

                    <SelectInput
                        label="Cargo"
                        id="role"
                        name="role"
                        fieldLabel='title'
                        fieldValue='name'
                        dataOptions={roles}
                        onChange={(e) => setData('role', e)}
                        error={errors && errors?.role}
                        required
                        size="lg"
                        autoComplete="roles"
                        disabled={isShow}
                    />
                    {errors?.roles && <span className="text-red-500 text-xs">{errors.roles}</span>}
                </div>

                <div className="mt-4 flex gap-2">
                    <Button
                        className=""
                        onClick={() => window.history.back()}
                    >
                        Voltar
                    </Button>
                    {!isShow && (
                        <Button className="" type="submit" disabled={processing} fullWidth>
                            {isEdit ? 'Salvar' : 'Cadastrar'}
                        </Button>
                    )}
                    {isShow && (
                        <Link href={route('admin.users.edit', user.id)} className="w-full">
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
