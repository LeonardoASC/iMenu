import React from 'react';
import { Link } from '@inertiajs/react';

export default function CardHeader({ title, description }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-6 p-4 rounded-lg shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <Link href={route('category.index')}>
        <button
          type="button"
          className="mt-3 sm:mt-0 inline-block text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        >
          Categorias
        </button>
      </Link>
    </div>
  );
}
