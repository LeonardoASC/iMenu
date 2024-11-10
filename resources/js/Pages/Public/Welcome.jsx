import React from 'react';
import { useForm } from '@inertiajs/react';

const Welcome = () => {
    const { data, setData, post, processing, errors } = useForm({
        cpf: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/create-session');
    };

    return (
        <>
            <div className="flex h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Digite seu CPF para acessar o cardapio e gerar uma comanda
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-[90%]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="cpf" className="block text-sm/6 font-bold text-gray-900">
                                    Insira seu CPF:
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    value={data.cpf}
                                    onChange={(e) => setData('cpf', e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                                {errors.cpf && <div style={{ color: 'red' }}>{errors.cpf}</div>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit" disabled={processing}
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {processing ? 'Vamos lá...' : 'Entrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Welcome;
