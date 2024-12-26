import React, { useState } from 'react';
import { NavigationBar } from '@/Components/NavigationBar';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from "@material-tailwind/react";
import { BsArrowBarLeft } from 'react-icons/bs';
export default function UserOrder({ orders }) {

    return (
        <div className="h-screen w-full bg-gray-100">
            {/* <div className="w-full text-center bg-white p-2 rounded-b-xl shadow">Estamos preparando o seu pedido</div> */}
            <div className="flex items-center w-full p-2 bg-white shadow rounded-b-xl">
                <IconButton
                    variant="text"
                    size="sm"
                    onClick={() => window.history.back()}
                >
                    <BsArrowBarLeft className="w-5 h-5" />
                </IconButton>
                <div className="flex-1 text-center">
                    <p>Estamos preparando o seu pedido</p>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-6">
                    {orders && orders.map(orderProduct => (
                        <Card key={orderProduct.id} className="shadow-lg">
                            <CardHeader floated={false} className="bg-blue-500 text-white flex flex-col md:flex-row items-start md:items-center justify-between p-4">
                                <div>
                                    {/* <Typography variant="h5" className="text-white">
                                        Pedido #{orderProduct.id}
                                    </Typography> */}
                                    <Typography className="text-white">
                                        {orderProduct.product.name}
                                    </Typography>
                                    <Typography variant="small" className="text-white">
                                        Status: {orderProduct.status}
                                    </Typography>
                                </div>
                                <div className="mt-2 md:mt-0 flex flex-col items-end w-full">
                                    <Typography variant="small" className="text-white text-xs">
                                        Preço: R$ {orderProduct.price} ({orderProduct.quantity}x)
                                    </Typography>
                                    <Typography variant="small" className="text-white">
                                        Total: R$ {(orderProduct.price * orderProduct.quantity).toFixed(2)}
                                    </Typography>
                                </div>
                            </CardHeader>
                            {/* <CardBody>
                                <div className="mb-4">
                                    <Typography variant="small" color="blue-gray">
                                        Notas: {orderProduct.order.notes}
                                    </Typography>
                                </div>
                            </CardBody> */}
                        </Card>
                    ))}

                </div>
            </div>
            <NavigationBar />
        </div >
    );
}
