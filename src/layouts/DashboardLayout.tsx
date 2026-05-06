import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayout() {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // redirect ke halaman login setelah logout
        navigate("/login");
    };

    return (
        <div className="flex w-full min-h-screen">
            <aside className="w-64 bg-linear-to-b from-red-700 to-red-900 text-white flex flex-col justify-between p-5 shadow-2xl">
                <div>
                    {/* Logo / Title */}
                    <div className="flex items-center justify-center border-b border-white/10 pb-5">
                        <h2 className="text-3xl font-extrabold tracking-wide">
                            Invofest
                        </h2>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-3 mt-6">
                        <Link
                            to="/dashboard"
                            className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/15 hover:translate-x-1 transition-all duration-200"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/dashboard/category"
                            className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/15 hover:translate-x-1 transition-all duration-200"
                        >
                            Kategori Event
                        </Link>

                        <Link
                            to="/dashboard/event"
                            className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/15 hover:translate-x-1 transition-all duration-200"
                        >
                            Event
                        </Link>

                        <Link
                            to="/dashboard/pembicara"
                            className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/15 hover:translate-x-1 transition-all duration-200"
                        >
                            Pembicara
                        </Link>
                    </nav>
                </div>

                {/* Logout */}
                <div className="pt-5 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        type="button"
                        className="w-full py-3 rounded-xl bg-white text-red-700 font-semibold hover:bg-red-100 transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main>
                <Outlet />
            </main>
        </div>
    );
}