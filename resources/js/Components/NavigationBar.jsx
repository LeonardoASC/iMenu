import React from 'react';
import { Navbar, Typography } from "@material-tailwind/react";

export function NavigationBar() {
    return (
        <div className="w-full flex justify-center">
            <Navbar  className="fixed bottom-5 w-[90%] bg-white text-black z-50">
                <ul className="flex justify-around">
                    <li>
                        <Typography as="a" href="#home" className="hover:bg-gray-700  rounded">
                            Home
                        </Typography>
                    </li>
                    <li>
                        <Typography as="a" href="#pedidos" className="hover:bg-gray-700  rounded">
                            Pedidos
                        </Typography>
                    </li>
                    <li>
                        <Typography as="a" href="#comanda" className="hover:bg-gray-700  rounded">
                            Comanda
                        </Typography>
                    </li>
                </ul>
            </Navbar>
        </div>
    );
};
