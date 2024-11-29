import React from 'react';

export default function Show({ product }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="mt-2 text-lg text-slate-600">{product.description}</p>
            <p className="mt-4 text-lg font-semibold">Preço: R$ {product.price}</p>
            <button
                className="mt-6 px-4 py-2 bg-[#ce3246] text-white rounded"
                onClick={() => console.log('Pedido realizado!')}
            >
                Realizar Pedido
            </button>
        </div>
    );
}
