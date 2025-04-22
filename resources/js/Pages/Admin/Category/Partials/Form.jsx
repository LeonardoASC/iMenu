import React, { useRef, useState } from 'react';
import { Link } from '@inertiajs/react';

export default function FormCategory({ data, setData, errors, processing = false, handleSubmit, isShow = false, isEdit = false, category }) {
    const [imageName, setImageName] = useState('');
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageName(file.name);
            setData('image', file);
        }
    };

    return (
        <div className="w-80 max-w-screen-lg sm:w-96 mt-4 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name || ''}
                            onChange={(e) => setData('name', e.target.value)}
                            required={!isEdit && !isShow}
                            disabled={isShow}
                            placeholder="Ex: Eletrônicos"
                            autoComplete="name"
                            className={`mt-1 block w-full rounded-lg border ${errors?.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors?.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Status Field */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={data.status || 'Enable'}
                            onChange={(e) => setData('status', e.target.value)}
                            required={!isEdit}
                            disabled={isShow}
                            className={`mt-1 block w-full rounded-lg border ${errors?.status ? 'border-red-500' : 'border-gray-300'} bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                        >
                            <option value="Enable">Enable</option>
                            <option value="Disable">Disable</option>
                        </select>
                        {errors?.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                    </div>

                    {/* Image Selector */}
                    {!isShow && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <div className="mt-1 relative flex items-center">
                                <input
                                    type="text"
                                    readOnly
                                    value={imageName || 'Selecionar imagem'}
                                    onClick={handleButtonClick}
                                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 py-2 px-3 pr-28 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleButtonClick}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 px-3 py-1 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Selecionar
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    required={!isEdit}
                                />
                            </div>
                            {errors?.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                        </div>
                    )}

                    {/* Preview Existing or Selected Image */}
                    {category?.image && (
                        <div className="border-2 border-dotted border-gray-500 p-2 rounded-lg">
                            <img
                                src={imageName ? URL.createObjectURL(data.image) : `/storage/${category.image}`}
                                alt="Category"
                                className="h-32 w-32 rounded-3xl object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-2">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Back
                    </button>
                    {!isShow ? (
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50"
                        >
                            {isEdit ? 'Update' : 'Create'}
                        </button>
                    ) : (
                        <Link href={route('category.edit', category.id)} className="flex-1">
                            <button
                                type="button"
                                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Editar
                            </button>
                        </Link>
                    )}
                </div>
            </form>
        </div>
    );
}
