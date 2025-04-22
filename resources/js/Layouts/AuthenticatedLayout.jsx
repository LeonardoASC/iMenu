import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    Bars3Icon,
    XMarkIcon,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ header, children }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(0);
    const { props, url } = usePage();
    const { auth } = props;
    const user = auth?.user || {};

    const toggleMenu = (index) => setOpenMenu(openMenu === index ? 0 : index);
    const segments = url ? url.split('/').filter(Boolean) : [];

    return (
        <div className="flex h-screen bg-gray-100 overflow-x-hidden">
            <div onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
            />

            <aside className={`
                fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 
                transform transition-transform duration-300 ease-in-out flex flex-col
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0
            `}>
                <div className="flex items-center justify-between px-4 py-4  bg-[#2B2D42]">
                    <Link href={route('dashboard')} className="text-xl font-semibold text-white">
                        Dashboard
                    </Link>
                    <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
                        <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                </div>

                <div className="px-4 py-3">
                    <input type="text" placeholder="Search"
                        className="w-full px-3 py-2 text-sm border border-blue-300 bg-blue-50 rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <nav className="flex-1 overflow-y-auto ">
                    <ul className="px-4 py-2 space-y-1 ">
                        <li>
                            <button onClick={() => toggleMenu(1)}
                                className="flex items-center w-full px-2 py-2 text-gray-700  hover:bg-gray-100 rounded"
                            >
                                <PresentationChartBarIcon className="h-5 w-5 mr-3" />
                                <span>Dashboard</span>
                                <ChevronDownIcon
                                    className={`h-4 w-4 ml-auto transform transition-transform duration-200 ${openMenu === 1 ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openMenu === 1 && (
                                <ul className="pl-10 mt-1 space-y-1">
                                    <li>
                                        <Link href="#" className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Analytics
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Reporting
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Projects
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button
                                onClick={() => toggleMenu(2)}
                                className="flex items-center w-full px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
                            >
                                <ShoppingBagIcon className="h-5 w-5 mr-3" />
                                <span>E‑Gestão</span>
                                <ChevronDownIcon
                                    className={`h-4 w-4 ml-auto transform transition-transform duration-200 ${openMenu === 2 ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openMenu === 2 && (
                                <ul className="pl-10 mt-1 space-y-1">
                                    <li>
                                        <Link href={route('category.index')} className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Categoria
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('product.index')} className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Produtos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('charges.index')} className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Nossas Taxas
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('order.index')} className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Comandas
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('table.index')} className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Mesas
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('establishment.index')} className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Estabelecimentos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('admin.users.index')} className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded">
                                            Usuários
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className="pt-4">
                            <hr className="border-gray-200" />
                        </li>

                        <li>
                            <Link href="#" className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                <InboxIcon className="h-5 w-5 mr-3" />
                                <span>Inbox</span>
                                <span className="ml-auto text-xs text-gray-500">14</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('profile.edit')} className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                <UserCircleIcon className="h-5 w-5 mr-3" />
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                <Cog6ToothIcon className="h-5 w-5 mr-3" />
                                Settings
                            </Link>
                        </li>

                    </ul>
                </nav>
            </aside>

            <div className="flex flex-col flex-1 ">
                <header className="flex items-center justify-between bg-[#2B2D42] border-b border-gray-200 p-4 md:hidden ">
                    <button onClick={() => setSidebarOpen(true)}>
                        <Bars3Icon className="h-6 w-6 text-white" />
                    </button>
                    <div>{header}</div>
                </header>

                <header className="hidden md:flex items-center justify-between bg-[#2B2D42] border-b border-gray-200 p-4">
                    <div className="flex items-center space-x-4">
                        {user.profile_photo_url && (
                            <img src={user.profile_photo_url} alt={user.name} className="h-8 w-8 rounded-full" />
                        )}
                        <nav className="flex items-center space-x-2 text-white text-sm">
                            {segments.map((seg, idx) => (
                                <span key={idx} className="capitalize">/ {seg.replace(/-/g, ' ')}</span>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-white capitalize text-xl">{user.name}</span>
                        <button
                            onClick={() => router.visit(route('logout'), { method: 'post' })}
                            className="flex items-center text-white hover:text-gray-800 focus:outline-none"
                        >
                            <PowerIcon className="h-5 w-5 mr-1" />
                            Logout
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4">{children}</main>
            </div>
        </div>
    );
}
