import React from 'react';
import { ListItem, ListItemPrefix, Navbar, Typography } from "@material-tailwind/react";
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export function NavigationBar() {
    return (
        <div className="w-full flex justify-center fixed">
            <Navbar className="fixed bottom-5 w-[90%] bg-white text-black z-50">
                <ul className="flex justify-around">
                    <li>
                        <Typography as="a" href={route('menu.index')} className="hover:bg-gray-700  rounded">
                            Home
                        </Typography>
                    </li>
                    <li>
                        <Typography as="a" href="#pedidos" className="hover:bg-gray-700  rounded">
                            Pedidos
                        </Typography>
                    </li>
                    <li>
                        <Typography as="a" href={route('order.userOrder')} className="hover:bg-gray-700  rounded">
                            Comanda
                        </Typography>
                    </li>
                </ul>
            </Navbar>
        </div>
    );
};
