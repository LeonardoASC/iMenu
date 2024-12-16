import { Card, CardHeader, CardBody, List, Button } from '@material-tailwind/react';
import React, { useState } from 'react';

export default function UserOrder({ orders, openOrders, otherOrders }) {
    const [showOldOrders, setShowOldOrders] = useState(false);

    // const today = new Date().toISOString().split('T')[0];

    // const todayOrders = orders.filter(
    //     (order) => new Date(order.created_at).toISOString().split('T')[0] === today
    // );
    // const oldOrders = orders.filter(
    //     (order) => new Date(order.created_at).toISOString().split('T')[0] !== today
    // );

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100 p-4">
            <Card className="w-full max-w-lg shadow-lg h-[90vh]">
                <CardHeader color="blue-gray" className="text-white py-4 px-6">
                    <h1 className="text-lg font-bold">Meus Pedidos</h1>
                </CardHeader>
                <CardBody className="h-full w-full flex flex-col justify-end overflow-y-auto">
                    <List className="w-full ">
                        {otherOrders.length > 1 &&
                            <div className="flex justify-center mt-4">
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
                                <List key={order.id} className="flex flex-col gap-4 py-4 ">
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
                                            <p className="text-blue-600 font-semibold">
                                                Status: {order.status}
                                            </p>
                                            <p className="text-gray-500">Total: ${order.total}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500">
                                                Usuário ID: {order.user_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                            Produtos
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
                                </List>
                            ))}
                    </List>
                    <List className="w-full ">
                        {openOrders.length > 0 ? (
                            openOrders.map((order) => (
                                <List key={order.id} className="flex flex-col gap-4 py-4 ">
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
                                            <p className="text-blue-600 font-semibold">
                                                Status: {order.status}
                                            </p>
                                            <p className="text-gray-500">Total: ${order.total}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500">
                                                Usuário ID: {order.user_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                            Produtos
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
                                </List>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-4">
                                Nenhum pedido encontrado para hoje.
                            </p>
                        )}
                    </List>
                </CardBody>
            </Card>
        </div>
    );
}
{/* <List className={`${showOldOrders ? 'h-full' : (`${openOrders.length > 1 ? 'h-full' : 'h-fit'}`)  } w-full flex  overflow-y-auto`}>
                        {otherOrders.length > 1 &&
                            <div className="flex justify-center mt-4">
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
                                <List key={order.id} className="flex flex-col gap-4 py-4">
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
                                            <p className="text-blue-600 font-semibold">
                                                Status: {order.status}
                                            </p>
                                            <p className="text-gray-500">Total: ${order.total}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500">
                                                Usuário ID: {order.user_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                            Produtos
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
                                </List>
                            ))}
                        {openOrders.length > 0 ? (
                            openOrders.map((order) => (
                                <List key={order.id} className="flex flex-col gap-4 py-4">
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
                                            <p className="text-blue-600 font-semibold">
                                                Status: {order.status}
                                            </p>
                                            <p className="text-gray-500">Total: ${order.total}</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500">
                                                Usuário ID: {order.user_id}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-700 mb-2">
                                            Produtos
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
                                </List>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-4">
                                Nenhum pedido encontrado para hoje.
                            </p>
                        )}
                    </List> */}
