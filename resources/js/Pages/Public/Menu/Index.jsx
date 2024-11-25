import React from 'react';
import { usePage } from '@inertiajs/react';
import { Input } from '@material-tailwind/react';

export default function Index() {

    const { email } = usePage().props;
    return (
        <main className="container mx-auto bg-[#fffdfd] h-screen">
            <div className="flex flex-col w-full h-[25%] px-4 py-10 bg-[#ce3246]">
                <h3 className="text-white font-bold">Ola,</h3>
                <h1 className="text-2xl text-white font-bold mb-4">Seja Bem-Vindo(a)</h1>
                <div className="w-full self-center">

                    <Input label="Username"
                        className="bg-white"
                    />
                </div>
            </div>
            {/*
            <p>Bem-vindo ao cardápio!</p>
            <p>email: {email}</p> */}

        </main>
    );
};

