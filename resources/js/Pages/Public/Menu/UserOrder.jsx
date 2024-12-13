import { Card, CardHeader, CardBody, List, ListItem } from '@material-tailwind/react';
import React from 'react';

export default function UserOrder({ orders }) {
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100 p-4">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader color="blue-gray" className="text-white py-4 px-6">
                    <h1 className="text-lg font-bold">Meus Pedidos</h1>
                </CardHeader>
                <CardBody>
                    <List className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <List  key={order.id} className="flex flex-col gap-4 py-4">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-blue-600 font-semibold">
                                            Status: {order.status}
                                        </p>
                                        <p className="text-gray-500">Total: ${order.total}</p>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Usuário ID: {order.user_id}
                                    </p>
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
