import React, { useState, useMemo } from 'react';
import { Input } from '@material-tailwind/react';
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useDebounce } from 'use-debounce';

export default function Menu({ email, categories }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);


    const filteredCategories = useMemo(() => {
        return categories
            .filter(category => !selectedCategoryId || category.id === selectedCategoryId)
            .map((category) => {
                const filteredProducts = category.products.filter((product) =>
                    product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
                );
                return {
                    ...category,
                    products: filteredProducts,
                };
            })
            .filter((category) => category.products.length > 0);
    }, [debouncedSearchQuery, categories, selectedCategoryId]);


    return (
        <main className=" mx-auto bg-[#f9f9f9] h-screen">
            <div className="flex flex-col justify-center w-full h-[20%] px-4 bg-[#ce3246]">
                {/* {email && <p className="text-white mb-4 text-center ">Email da comanda: {email}</p>} */}
                {/* <h3 className="text-white font-bold">Olá, {email}</h3> */}
                <h1 className="text-2xl text-white font-bold mb-4">Seja Bem-Vindo(a)</h1>
            </div>

            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg z-10 shadow w-[90%]">
                <Input
                    label="Pesquisar..."
                    className="bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="p-4 mt-6 bg-[#f9f9f9]">
                <div className="flex flex-row justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-800 ">Categorias</h1>
                    {selectedCategoryId && (
                        <button
                            onClick={() => setSelectedCategoryId(null)}><span className="text-sm font-medium underline">Limpar Filtros</span>
                        </button>
                    )}
                    {!selectedCategoryId && (
                        <ArrowRightIcon className="h-5 w-5" />
                    )}
                </div>
                <div className="relative flex overflow-x-auto space-x-4 p-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategoryId(category.id)}
                            className={`flex-shrink-0 flex flex-col items-center justify-center w-40 h-40 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all ${selectedCategoryId === category.id ? 'bg-[#ce3246] text-white' : 'bg-white text-slate-800'
                                }`}
                        >
                            <img
                                src={`/storage/${category.image}`}
                                alt={category.name}
                                className="w-12 h-12 mb-2"
                            />
                            <span className="text-sm font-medium">{category.name}</span>
                        </button>
                    ))}
                </div>
                <div className="h-px w-full bg-gray-100 mb-4" />
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <div key={category.id} className="mb-8">
                            <div className="flex items-center gap-4 mb-4 ">
                                <h2 className="text-xl font-semibold text-slate-800 text-red-600">{category.name}</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex flex-col rounded-xl bg-white shadow-sm border border-slate-200  hover:shadow-md transition-all"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-40 object-cover rounded-t-xl"
                                        />
                                        {/* <div className="px-4 py-4">
                                        <h3 className="text-lg font-bold text-slate-800">{product.name}</h3>
                                        <p className="text-slate-600 text-sm mb-2">{product.description}</p>
                                        <p className="text-slate-800 font-semibold">Preço: R$ {product.price}</p>
                                        </div> */}
                                        <div class="p-8">
                                            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Preço: R$ {product.price}</div>
                                            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{product.description}</a>
                                            <p class="mt-2 text-slate-500">{product.description}</p>
                                        </div>
                                    </div>
                                    // <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                                    //     <div class="md:flex">
                                    //         <div class="md:shrink-0">
                                    //             <img class="h-48 w-full object-cover md:h-full md:w-48" src={product.image} alt="Modern building architecture" />
                                    //         </div>
                                    //         <div class="p-8">
                                    //             <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Preço: R$ {product.price}</div>
                                    //             <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{product.description}</a>
                                    //             <p class="mt-2 text-slate-500">{product.description}</p>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-600 text-center mt-4">Produto não encontrado</p>
                )}
            </div>
        </main>
    );
}
