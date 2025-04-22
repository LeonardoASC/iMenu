import React from 'react';

export function ModalDelete({ isOpen, softDelete = false, onClose, name, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-md w-11/12 max-w-md mx-4">
                {/* Header */}
                <div className="bg-gray-50 p-4 rounded-t-2xl border-b border-gray-200 flex items-center gap-3">
                    <div className="bg-red-100 rounded-full p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                        {softDelete ? 'Desativar Registro' : 'Excluir Registro'}
                    </h3>
                </div>

                {/* Body */}
                <div className="p-4 text-base text-gray-700">
                    <p className="mb-2">
                        {softDelete
                            ? 'Tem certeza de que deseja desativar este registro?'
                            : 'Tem certeza de que deseja excluir este registro? Esta ação não pode ser desfeita.'}
                    </p>
                    {name && <p className="font-bold text-gray-800">{name}</p>}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg shadow-sm bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
