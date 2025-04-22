import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    PencilIcon,
    UserPlusIcon,
    TrashIcon,
    EyeIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { Link, router, useForm } from "@inertiajs/react";
import { ModalDelete } from "../../../../Components/ModalDelete";
import { useState } from "react";

const TABS = [
    { label: "All", value: "all" },
    { label: "Enable", value: "Enable" },
    { label: "Disable", value: "Disable" },
];

export function TableCategory({ categories }) {
    const categoryData = categories.data || [];
    const { delete: forceDelete } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [activeTab, setActiveTab] = useState("all");

    const handleDelete = (id) => {
        setSelectedCategoryId(id);
        setIsModalOpen(true);
    };
    const handleConfirmDelete = () => {
        forceDelete(route("category.forceDelete", selectedCategoryId));
        setIsModalOpen(false);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategoryId(null);
    };

    return (
        <div className="bg-white rounded-2xl shadow-md w-full h-full p-4 flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Categories List
                        </h2>
                        <button
                            type="button"
                            className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                        >
                            <InformationCircleIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-base justify-center sm:justify-start font-normal text-gray-700 mt-1">
                        See information about all Categories
                    </p>
                </div>
                <div className="flex  sm:flex-row gap-2">
                    <button className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        view all
                    </button>
                    <Link href={route("category.create")}>
                        <button className="flex items-center gap-3 px-4 py-2 rounded-lg shadow-sm bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400">
                            <UserPlusIcon className="h-4 w-4" />
                            Add Category
                        </button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="flex space-x-4">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`${activeTab === tab.value
                                ? "bg-blue-500 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                                } px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="w-full md:w-72">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border border-gray-300 rounded-lg p-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute top-1/2 transform -translate-y-1/2 right-3" />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <table className="w-full table-auto text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 font-medium text-gray-600">Category</th>
                            <th className="p-4 font-medium text-gray-600">Status</th>
                            <th className="p-4 font-medium text-gray-600">Created At</th>
                            <th className="py-4 px-2 font-medium text-gray-600"></th>
                            <th className="py-4 px-2 font-medium text-gray-600"></th>
                            <th className="py-4 px-2 font-medium text-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData.map(({ id, image, name, status, created_at }) => (
                            <tr
                                key={id}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td className="p-4 flex items-center gap-3">
                                    <img
                                        src={`/storage/${image}`}
                                        alt={name}
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <span className="text-sm text-gray-800">{name}</span>
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${status === "Enable"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {status === "Enable" ? "Enable" : "Disabled"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm text-gray-800">{created_at}</span>
                                </td>
                                <td className="py-4 px-2 w-2 ">
                                    <Link href={route("category.show", id)}>
                                        <button className="flex items-center justify-center ">
                                            <EyeIcon className="h-4 w-4 text-gray-700" />
                                        </button>
                                    </Link>
                                </td>
                                <td className="py-4 px-2 w-2 ">
                                    <Link href={route("category.edit", id)}>
                                        <button className="flex items-center justify-center ">
                                            <PencilIcon className="h-4 w-4 text-gray-700" />
                                        </button>
                                    </Link>

                                </td>
                                <td className="py-4 px-2 w-2 ">
                                    <button
                                        onClick={() => handleDelete(id)}
                                        className="flex items-center justify-center"
                                    >
                                        <TrashIcon className="h-4 w-4 text-gray-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <span className="text-sm text-gray-700">
                    Page {categories.current_page} of {categories.last_page}
                </span>
                <div className="flex gap-2">
                    <button
                        disabled={!categories.prev_page_url}
                        onClick={() =>
                            categories.prev_page_url && router.visit(categories.prev_page_url)
                        }
                        className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        disabled={!categories.next_page_url}
                        onClick={() =>
                            categories.next_page_url && router.visit(categories.next_page_url)
                        }
                        className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>

            <ModalDelete
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}
