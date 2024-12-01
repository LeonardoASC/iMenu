import { ArrowLeftIcon, HeartIcon } from '@heroicons/react/24/solid';
import { router } from '@inertiajs/react';
import { IconButton, Rating, Textarea, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

export default function Show({ product }) {
    const [rated, setRated] = useState(4);
    const [quantityProduct, setQuantityProduct] = React.useState(0);
    return (
        <div className="h-screen bg-red-500">
            <div className="h-1/2 bg-blue-200">
                <div className="flex justify-between absolute w-full p-4">
                    <button
                        className="flex items-center text-slate-600 bg-white rounded p-1"
                        onClick={() => router.get('/menu')}
                    >
                        <ArrowLeftIcon className="h-6 w-6 text-[#ce3246]" />
                    </button>

                    <button
                        className="flex items-center text-slate-600 bg-white rounded p-1"
                        onClick={() => console.log('Favoritado!')}
                    >
                        <HeartIcon className="h-6 w-6 text-[#ce3246]" />
                    </button>
                </div>
                <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.name}
                />
            </div>
            <div className="rounded-t-3xl p-6 flex flex-col  mt-[-5%] bg-white z-10 relative w-full h-1/2 ">
                <p className="text-blue-gray-500 text-sm">nome do restaurante</p>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-lg font-semibold">R$ {product.price}</p>
                </div>
                <p className="text-blue-gray-500 text-sm">{product.category ? product.category.name : 'Sem categoria'}</p>
                <p className="mt-2 font-bold">Descrição</p>
                <p className="text-lg text-blue-gray-500">{product.description}</p>
                <Typography color="blue-gray" className="font-medium text-blue-gray-500 text-center">
                        134 Avaliações
                    </Typography>
                <div className="flex items-center gap-2 font-bold text-blue-gray-500 w-full justify-center">
                    <Typography color="blue-gray" className="font-medium text-blue-gray-500">
                        {rated}.0
                    </Typography>
                    <Rating quantityProduct={4} onChange={(quantityProduct) => setRated(quantityProduct)} />

                </div>
                <div className="w-full h-px bg-gray-100 my-4" />
                <div className="w-full ">
                    <Typography className="font-semibold">Voce tem alguma observação sobre este pedido?</Typography>
                    <Textarea label="Observação" />
                </div>
            </div>
            <div className="flex items-center justify-between fixed w-full bottom-0 bg-white p-4 drop-shadow-md z-20"
                style={{ boxShadow: '0px 4px 8px  rgba(0, 0, 0, 1)' }}>
                <div className="flex flex-col items-center gap-0.5">
                    {quantityProduct > 0 &&
                        <div className="text-xs absolute top-0 p-1 rounded-xl">
                            R${(product.price * quantityProduct).toFixed(2)}
                        </div>
                    }
                    <div className="flex items-center gap-0.5">
                        <IconButton
                            size="sm"
                            className="rounded-xl"
                            disabled={quantityProduct < 1}
                            onClick={() => setQuantityProduct((cur) => (cur === 0 ? 0 : cur - 1))}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4"
                            >
                                <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                            </svg>
                        </IconButton>
                        <Typography className="font-medium text-black w-6 text-center">
                            {quantityProduct}
                        </Typography>
                        <IconButton
                            size="sm"
                            className="rounded-xl"
                            onClick={() => setQuantityProduct((cur) => cur + 1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4"
                            >
                                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                            </svg>
                        </IconButton>
                    </div>
                </div>

                <button
                    disabled={quantityProduct === 0}
                    className={`px-4 py-2 ${quantityProduct === 0 ? 'bg-gray-400' : 'bg-[#ce3246]'} text-white rounded`}
                    onClick={() => console.log('Pedido realizado!')}>
                    Realizar Pedido
                </button>

            </div>
        </div>
    );
}
