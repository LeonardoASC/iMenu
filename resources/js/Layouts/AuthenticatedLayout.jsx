import { AdminSideBar } from '@/Components/AdminSideBar';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <AdminSideBar />
            <main className="ml-[2rem] flex-1 ">{children}</main>
        </div>
    );
}
