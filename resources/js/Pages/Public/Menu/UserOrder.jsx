import { Card, CardHeader, CardBody, List, ListItem } from '@material-tailwind/react';
import React from 'react';

export default function UserOrder({ orders }) {
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100 p-4 ">
            <Card className="w-full max-w-lg shadow-lg h-[90vh]">
                <CardHeader color="blue-gray" className="text-white py-4 px-6">
                    <h1 className="text-lg font-bold">Meus Pedidos</h1>
                </CardHeader>
                <CardBody className="overflow-y-auto">
                    <List className="">
                        {orders.map((order) => (
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
                                        <button className="text-sm text-white bg-green-600 px-2 py-1 rounded-md">Finalizar comanda</button>
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
                                                    <p>Subtotal: $
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
                            </List>
                        ))}
                    </List>
                </CardBody>
            </Card>
        </div>
    );
}
