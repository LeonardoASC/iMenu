import React from "react";
import {
    Typography,
    IconButton,
    Button
} from "@material-tailwind/react";
import { router } from "@inertiajs/react";
import { BsArrowBarLeft } from "react-icons/bs";

export default function Command() {
    const items = [
        {
            id: 1,
            name: "Cheese Hot Hamburger",
            price: 18.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Hamburger",
        },
        {
            id: 2,
            name: "Italian Hot Pizza",
            price: 13.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Pizza",
        },
        {
            id: 3,
            name: "Italian Hot Pizza",
            price: 13.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Pizza",
        },
        {
            id: 4,
            name: "Italian Hot Pizza",
            price: 13.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Pizza",
        },
        {
            id: 5,
            name: "Italian Hot Pizza",
            price: 13.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Pizza",
        },
        {
            id: 6,
            name: "Italian Hot Pizza",
            price: 13.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Pizza",
        },
        {
            id: 7,
            name: "Italian Hot Pizza",
            price: 13.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Pizza",
        },
        {
            id: 8,
            name: "Italian Hot Pizza",
            price: 13.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Pizza",
        },
        {
            id: 9,
            name: "Italian Hot Pizza",
            price: 13.99,
            quantity: 2,
            image: "https://via.placeholder.com/80x80?text=Pizza",
        },
    ];

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxes = 10.0;
    const delivery = 5.0;
    const total = subtotal + taxes + delivery;

     const handleMenuClick = () => {
            router.get(`/menu`);
        };

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
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-md object-cover mr-4"
                            />
                            <div className="flex-1">
                                <Typography variant="h6" className="font-medium text-gray-800">
                                    {item.name}
                                </Typography>
                                <Typography variant="small" className="text-gray-500">
                                    ${item.price.toFixed(2)}
                                </Typography>
                                <div className="flex items-center space-x-2 mt-2">
                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        className="px-2 py-1"
                                        onClick={() => alert("Diminuir quantidade")}
                                    >
                                        -
                                    </Button>
                                    <Typography variant="small" className="w-6 text-center">
                                        {item.quantity}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        size="sm"
                                        className="px-2 py-1"
                                        onClick={() => alert("Aumentar quantidade")}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                            <IconButton
                                variant="text"
                                size="sm"
                                color="gray"
                                onClick={() => alert("Remover item")}
                            >
                                ✕
                            </IconButton>
                        </div>
                    ))}
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
                        <Typography variant="small">${subtotal.toFixed(2)}</Typography>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <Typography variant="small">Taxes & Fees</Typography>
                        <Typography variant="small">${taxes.toFixed(2)}</Typography>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <Typography variant="small">Delivery Fee</Typography>
                        <Typography variant="small">${delivery.toFixed(2)}</Typography>
                    </div>
                    <div className="flex justify-between text-gray-900 font-semibold">
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">${total.toFixed(2)}</Typography>
                    </div>
                </div>

                <Button
                    className="w-full mt-4"
                    color="blue"
                    onClick={() => alert("Finalizar Comanda")}
                >
                    Finalizar Comanda
                </Button>
            </div>
        </div>
    );
}
