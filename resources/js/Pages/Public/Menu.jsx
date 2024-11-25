// resources/js/Pages/Menu.jsx
import React from 'react';
import { usePage } from '@inertiajs/react';

const Menu = () => {
    const { email } = usePage().props;
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Menu</h1>
            <p>Bem-vindo ao cardápio!</p>
            {/* Adicione aqui o conteúdo do cardápio */}
            {/* propriedade session email*/}
            <p>email: {email}</p>

        </div>
    );
};

export default Menu;
