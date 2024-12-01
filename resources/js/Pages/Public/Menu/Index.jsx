import React, { useState, useMemo } from 'react';
import { Badge, IconButton, Input } from '@material-tailwind/react';
import { ArrowRightIcon, HomeIcon, MagnifyingGlassIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useDebounce } from 'use-debounce';
import { router } from '@inertiajs/react';

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

    const handleProductClick = (product) => {
        router.get(`/menu/${product}`);
    };

    return (
        <main className=" mx-auto bg-[#f9f9f9] h-screen">
            <div className="flex flex-row items-center justify-between w-full h-[20%] px-4 bg-[#ce3246]">
                <h1 className="text-2xl text-white font-bold">Seja Bem-Vindo(a)</h1>
                {/* icone de carrinho */}
                <div className="flex flex-col items-center">
                    <Badge content="5" color="white">
                        {/* <IconButton> */}
                        <ShoppingCartIcon className="h-8 w-8" color="white" />
                        {/* </IconButton> */}
                    </Badge>
                    <p className="text-white text-sm">Meus pedidos</p>
                </div>
            </div>



            <div className="absolute to[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-10 shadow w-[90%]">
                <Input
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    label="Pesquise aqui o que voce quer comer :)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white"
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
                <div className="relative flex overflow-x-auto gap-4 p-4 mb-2 sm:justify-center sm:flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategoryId(category.id)}
                            className={`flex-shrink-0 flex flex-col items-center justify-center w-36 h-36 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all ${selectedCategoryId === category.id ? 'bg-[#ce3246] text-white' : 'bg-white text-slate-800'
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
                {/* <div className="h-px w-full bg-gray-100 mb-4" /> */}
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <div key={category.id} className="mb-8">
                            <div className="flex items-center gap-4 mb-2 p-1">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="relative inline-block h-10 w-10 !rounded-full object-cover object-center"
                                />
                                <h2 className="text-xl font-semibold text-slate-800 text-gray-600">{category.name}</h2>
                                <div className="h-px flex-grow bg-gray-400 " />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.products.map((product) => (
                                    <div key={product.id} className="w-full flex max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
                                        onClick={() => handleProductClick(product.id)}
                                    // onClick={() => console.log(product.id)}

                                    >
                                        <div className="w-1/3 h-full">
                                            <img
                                                className="w-full h-full object-cover rounded-s-xl"
                                                src={product.image}
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="flex items-center h-full w-2/3 ">
                                            <div className="w-full">
                                                <div className="p-2">
                                                    <p className="mt-1 text-lg leading-tight font-medium text-black line-clamp-1 hover:underline">
                                                        {product.name}
                                                    </p>
                                                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.description}</p>
                                                    <div className="mt-2 uppercase tracking-wide text-sm font-semibold text-indigo-500 line-clamp-1 ">
                                                        Preço: R$ {product.price}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
