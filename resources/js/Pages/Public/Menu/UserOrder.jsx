import React, { useState } from 'react';
import { NavigationBar } from '@/Components/NavigationBar';
import {
    Card,
    Typography,
    IconButton,
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { BsArrowBarLeft } from 'react-icons/bs';
import { AlertItemModal } from '@/Components/AlertItemModal';
export default function UserOrder({ orders }) {
    const [activeTab, setActiveTab] = useState("solicitados");

    const ordersPreparing = orders.filter(order => order.status == 'preparing');
    const ordersDelivered = orders.filter(order => order.status == 'delivered');
    const displayedOrders = activeTab === "solicitados" ? ordersPreparing : ordersDelivered;

    return (
        <div className="h-screen w-full bg-gray-100">

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
            <div className="flex space-x-4 m-4">
                <button
                    onClick={() => setActiveTab("solicitados")}
                    className={`pb-2 ${activeTab === "solicitados"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400"
                        }`}
                >
                    Solicitados
                </button>
                <button
                    onClick={() => setActiveTab("entregues")}
                    className={`pb-2 ${activeTab === "entregues"
                        ? "border-b-2 border-black text-black"
                        : "text-gray-400"
                        }`}
                >
                    Entregues
                </button>
            </div>
            <div className="p-6">
                <div className="space-y-6">
                    {orders && displayedOrders.length > 0 ? (
                        displayedOrders.map(orderProduct => (
                            <Card key={orderProduct.id} className="shadow-lg">
                                <div className="space-y-4">
                                    <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                                        <div className="flex flex-col mr-4">
                                            <img
                                                src={orderProduct.product.image}
                                                alt={orderProduct.name}
                                                className="w-16 h-16 rounded-md object-cover "
                                            />
                                            <Typography variant="small" className="font-medium text-gray-800">
                                                {orderProduct.status}
                                            </Typography>
                                        </div>
                                        <div className="flex-1">
                                            <Typography variant="h6" className="font-medium text-gray-800">
                                                {orderProduct.product.name}
                                            </Typography>
                                            <div className="flex justify-between">
                                                <Typography variant="small" className="text-gray-500">
                                                    ${orderProduct.price} ({orderProduct.quantity}x)
                                                </Typography>
                                                <Typography variant="small" className="text-gray-500">
                                                    Total: R$ {(orderProduct.price * orderProduct.quantity).toFixed(2)}
                                                </Typography>
                                            </div>
                                            <Popover>
                                                <PopoverHandler>
                                                    <Typography variant="small" className="text-gray-500">
                                                        Minha Observação: {orderProduct.order.notes.slice(0, 30)}...
                                                    </Typography>
                                                </PopoverHandler>
                                                <PopoverContent>
                                                    <Typography variant="small" className="text-gray-500">
                                                        {orderProduct.order.notes}
                                                    </Typography>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <AlertItemModal />
                                    </div>

                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="w-full flex items-center justify-center">
                            <Typography variant="small" color="blue-gray" className="self-center bg">
                                {activeTab == "solicitados" ? "Nenhum pedido solicitado ate o momento." : "Nenhum pedido entregue ate o momento."}
                            </Typography>
                        </div>
                    )}

                </div>
            </div>
            <NavigationBar />
        </div >
    );
}
