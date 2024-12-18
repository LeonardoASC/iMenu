import { Card, CardHeader, CardBody, List, Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import { ArrowLeftCircleIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { NavigationBar } from '@/Components/NavigationBar';
export default function UserOrder({ openOrders, otherOrders }) {
    const [showOldOrders, setShowOldOrders] = useState(false);

    return (
        <div className="h-screen w-full flex">
            {/* <div className="w-1/2">
                <div className="w-full flex justify-start p-4 bg-black">
                    <button className="text-blue-600 flex items-center" onClick={() => window.history.back()}>
                        <ArrowLeftCircleIcon className="h-6 w-6 mr-2" />
                        Voltar
                    </button>
                </div>
            </div> */}
            <div className="h-screen w-full flex flex-col justify-end bg-gray-100 items-center pb-24">

                <div className="overflow-y-auto p-4 space-y-4 w-full flex flex-col items-center">
                    {otherOrders.length > 1 &&
                        <div className="">
                            <button
                                className="text-blue-400 text-xs"
                                onClick={() => setShowOldOrders((prev) => !prev)}
                            >
                                {showOldOrders ? 'Ocultar Comandas Antigas' : `Mostrar Comandas Antigas (${otherOrders.length})`}
                            </button>
                        </div>
                    }

                    {showOldOrders &&
                        otherOrders.map((order) => (
                            <div key={order.id} className=" gap-4 py-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 border-t border-dashed border-gray-500"></div>
                                        <p className="text-xs text-center text-gray-600">
                                            {new Intl.DateTimeFormat('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })
                                                .format(new Date(order.created_at))
                                                .split('/')
                                                .join('-')}
                                        </p>
                                        <div className="flex-1 border-t border-dashed border-gray-500"></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-blue-600 font-semibold capitalize">
                                            Status: {order.status}
                                        </p>
                                        <p className="text-gray-500">Total: ${order.total}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500">
                                            Usuário: {order.user_id}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                        Pedidos
                                    </h2>
                                    <ul className="space-y-2">
                                        {order.products.map((product) => (
                                            <li
                                                key={product.id}
                                                className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm"
                                            >
                                                <div className="flex justify-between">
                                                    <p className="font-semibold text-gray-700">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        ${product.pivot.price}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-500 mt-1">
                                                    <p>Quantidade: {product.pivot.quantity}</p>
                                                    <p>
                                                        Subtotal: $
                                                        {(
                                                            product.pivot.quantity *
                                                            product.pivot.price
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                {order.status === 'open' && (
                                    <div className="flex justify-between items-center">
                                        <button className="text-sm text-white bg-green-600 px-2 py-1 rounded-md">Chamar um atendente</button>
                                        <button className="text-sm text-white bg-green-600 px-2 py-1 rounded-md">Finalizar comanda</button>
                                    </div>
                                )}
                            </div>
                        ))}

                    {openOrders.length > 0 ? (
                        openOrders.map((order) => (
                            <div key={order.id} className="flex flex-col gap-4 py-4 ">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 border-t border-dashed border-gray-500"></div>
                                        <p className="text-xs text-center text-gray-600">
                                            {new Intl.DateTimeFormat('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })
                                                .format(new Date(order.created_at))
                                                .split('/')
                                                .join('-')}
                                        </p>
                                        <div className="flex-1 border-t border-dashed border-gray-500"></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-green-600 font-semibold capitalize">
                                            Status: {order.status}
                                        </p>
                                        {/* <p className="text-gray-500">Total: ${order.total}</p> */}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-500">
                                            Usuário: {order.user_id}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                        Pedidos
                                    </h2>
                                    <ul className="space-y-2">
                                        {order.products.map((product) => (

                                            <li
                                                key={product.id}
                                                className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm"
                                            >
                                                <div className="flex justify-between">
                                                    <p className="font-semibold text-gray-700">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        ${product.pivot.price}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between text-sm text-gray-500 mt-1">
                                                    <p>Quantidade: {product.pivot.quantity}</p>
                                                    <p>Subtotal: $ {(product.pivot.quantity * product.pivot.price).toFixed(2)}
                                                    </p>
                                                </div>

                                            </li>

                                        ))}
                                    </ul>
                                </div>
                                {order.status === 'open' && (
                                    <div className="flex justify-between items-center">
                                        <button className="text-sm text-white bg-green-600 px-2 py-1 rounded-md">Chamar um atendente</button>
                                        <button className="text-sm text-white bg-green-600 px-2 py-1 rounded-md">Finalizar comanda</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-4">
                            Nenhum pedido encontrado para hoje.
                        </p>
                    )}

                </div>

            </div >
            <NavigationBar />
        </div >
    );
}
