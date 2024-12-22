import InputError from '@/Components/InputError'
import { Link } from '@inertiajs/react';
import { Button, Switch, Typography } from '@material-tailwind/react'
import React from 'react'

export default function FormAbilities({ handleSubmit, data, setData, errors, abilities, processing=false, viewMode = false }) {
    const handleChange = (e) => {
        const abilityId = parseInt(e.target.value);
        setData('abilities', e.target.checked
            ? [...data.abilities, abilityId]
            : data.abilities.filter(id => id !== abilityId)
        );
    };

    const handleSelectAll = () => {
        setData('abilities', abilities.map((ability) => ability.id));
    };

    const handleSelectNone = () => {
        setData('abilities', []);
    };

    return (
        <div>
            <div className="overflow-hidden shadow-sm sm:rounded-lg p-4 space-y-4">
                <div className="flex justify-between space-x-2">
                    <div>
                        <Typography color="blue-gray">{data?.title}</Typography>
                    </div>
                    <div>
                        {data.abilities.length > 0 && (
                            <Button variant='text' size='sm' onClick={() => handleSelectNone()}>Desabilitar Tudo</Button>
                        )}
                        {data.abilities.length < abilities.length && (
                            <Button variant='text' size='sm' onClick={() =>handleSelectAll()}>Habilitar Tudo</Button>
                        )}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {abilities.map((ability) => (
                            <div key={ability.id} className="flex items-center space-x-2">
                                <Switch
                                    type='checkbox'
                                    name="abilities[]"
                                    value={ability.id}
                                    checked={data.abilities.includes(ability.id)}
                                    onChange={handleChange}
                                />
                                <Typography>{ability.title}</Typography>
                            </div>
                        ))}
                    </div>

                    <div className='flex items-center justify-between mt-4'>
                        <Link href={route('admin.roles.index')}>
                            <Button disabled={processing} variant='outlined'>
                                Voltar
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            Confirmar
                        </Button>
                    </div>
                    <InputError message={errors.abilities} className="mt-4 text-end" />
                </form>

            </div>
        </div>
    )
}
