import React from 'react';
import { Input } from '@material-tailwind/react';

export default function Menu({ email, categories, products }) {
    return (
        <main className="container mx-auto bg-[#fffdfd] h-screen">
            <div className="flex flex-col w-full h-[20%] px-4 py-10 bg-[#ce3246]">
                <h3 className="text-white font-bold">Olá,</h3>
                <h1 className="text-2xl text-white font-bold mb-4">Seja Bem-Vindo(a)</h1>
                <div className="w-full self-center">
                    <Input label="Pesquisar..." className="bg-white" />
                </div>
            </div>

            <div className="p-4">
                {email && <p className="text-slate-600 mb-4">Email da comanda: {email}</p>}
                <div className="flex flex-row justify-between">
                    <h1 className="text-xl font-bold text-slate-800">Categorias</h1>
                    <h1 className=" font-bold text-slate-800">Ver Mais +</h1>
                </div>
                <div className="relative flex overflow-x-auto space-x-4 p-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            // onClick={() => onFilter(category.id)}
                            className="flex-shrink-0 flex flex-col items-center justify-center w-40 h-40 rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all"
                        >
                            <img
                                src={`/storage/${category.image}`}
                                alt={category.name}
                                className="w-12 h-12 mb-2"
                            />
                            <span className="text-sm font-medium text-slate-800">{category.name}</span>
                        </button>
                    ))}
                </div>

                {categories.map((category) => (
                <div key={category.id} className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-xl font-semibold text-slate-800">{category.name}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.products.map((product) => (
                            <div
                                key={product.id}
                                className="flex flex-col rounded-lg bg-white shadow-sm border border-slate-200 p-4 hover:shadow-md transition-all"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-lg font-bold text-slate-800">{product.name}</h3>
                                <p className="text-slate-600 text-sm mb-2">{product.description}</p>
                                <p className="text-slate-800 font-semibold">Preço: R$ {product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </main>
    );
}
