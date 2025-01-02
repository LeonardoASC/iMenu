import React from "react";
import {
    Typography,
    IconButton,
    Button
} from "@material-tailwind/react";
import { router } from "@inertiajs/react";
import { BsArrowBarLeft } from "react-icons/bs";
import { AlertItemModal } from "../../../Components/AlertItemModal";
import { TbAlertOctagonFilled } from "react-icons/tb";

export default function Command({ orders, taxes, delivery, total, subtotal }) {

    const handleMenuClick = () => {
        router.get(`/menu`);
    };

    const handleFinishComand = (id) => {
        router.put(`/finishcomand/${id}`)
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex items-center w-full p-2 bg-white shadow rounded-b-xl">
                <IconButton
                    variant="text"
                    size="sm"
                    onClick={() => window.history.back()}
                >
                    <BsArrowBarLeft className="w-5 h-5" />
                </IconButton>
                <div className="flex-1 text-center">
                    <p>Comanda</p>
                </div>
            </div>


            <div className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                    {orders.some((order) =>
                        order.products.some((product) => product.pivot.status === 'delivered')
                    ) ? (
                        orders.map((order) => (
                            <div key={order.id} className="space-y-4">
                                {order.products
                                    .filter((product) => product.pivot.status === 'delivered')
                                    .map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center bg-white rounded-lg p-3 shadow-sm"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 rounded-md object-cover mr-4"
                                            />

                                            <div className="flex-1">
                                                <Typography variant="h6" className="font-medium text-gray-800">
                                                    {product.name} -  ({product.pivot.quantity}x)
                                                </Typography>
                                                <div className="flex justify-between">
                                                    <Typography variant="small" className="text-gray-500">
                                                        R${product.pivot.price} un.
                                                    </Typography>
                                                    <Typography variant="small" className="text-gray-500">
                                                        Total: R$ {(product.pivot.price * product.pivot.quantity).toFixed(2)}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <AlertItemModal />
                                        </div>
                                    ))}
                            </div>
                        ))
                    ) : (
                        <div className="w-full flex items-center justify-center">
                            <Typography variant="small" color="blue-gray" className="self-center bg">
                                Ainda não há pedidos entregues por aqui.
                            </Typography>
                        </div>
                    )}
                </div>



                <Button
                    variant="text"
                    size="sm"
                    color="orange"
                    className="mt-4"
                    onClick={() => handleMenuClick()}

                >
                    + Cardapio
                </Button>
            </div>

            <div className="border-t border-gray-200 bg-white p-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                        <Typography variant="small">Sub total</Typography>
                        <Typography variant="small">R${subtotal.toFixed(2)}</Typography>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <Typography variant="small">Taxa de serviço</Typography>
                        <Typography variant="small">R${taxes.toFixed(2)}</Typography>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <Typography variant="small">Couvert artístico</Typography>
                        <Typography variant="small">R${delivery.toFixed(2)}</Typography>
                    </div>
                    <div className="flex justify-between text-gray-900 font-semibold">
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">R${total.toFixed(2)}</Typography>
                    </div>
                </div>
                <div>
                    {subtotal > 0 ? (
                        <div className="flex gap-2 mt-4">
                            <Button
                                className="p-2"
                                color="red"
                                onClick={() => alert("cancelar comanda")}
                            >
                                <TbAlertOctagonFilled className="w-5 h-5" />
                            </Button>
                            <Button
                                className="w-full bg-green-700"
                                onClick={() => handleFinishComand(orders[0]?.id)}
                            >
                                Finalizar Comanda
                            </Button>
                        </div>
                    ) : (
                        <div className="flex gap-2 mt-4">
                            <Button
                                className="w-full bg-blue-700"
                                onClick={() => handleMenuClick()}
                            >
                                😍 Ver o cardapio 😍
                            </Button>
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
}
