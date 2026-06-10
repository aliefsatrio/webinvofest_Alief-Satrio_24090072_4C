import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

export default function DashboardLayout() {

    const logout =
        useAuthStore((state) => state.logout);

    const navigate =
        useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    const menuClass = ({ isActive }: {
        isActive: boolean;
    }) => `

        px-5 py-4 rounded-2xl
        font-semibold text-[15px]
        transition-all duration-300

        border border-white/10

        ${isActive
            ? `
                bg-white text-red-700
                shadow-lg
              `
            : `
                bg-white/5 text-white
                hover:bg-white/15
                hover:translate-x-1
              `
        }

    `;

    return (

        <div className="flex min-h-screen bg-red-50">

            {/* SIDEBAR */}
            <aside
                className="
                    w-72 sticky top-0 h-screen
                    bg-gradient-to-b
                    from-red-700
                    via-red-800
                    to-red-900

                    text-white
                    flex flex-col justify-between

                    px-5 py-6
                    shadow-xl
                "
            >

                <div>

                    {/* LOGO */}
                    <div
                        className="
                            flex items-center justify-center
                            pb-6 mb-8
                            border-b border-white/10
                        "
                    >

                        <h2
                            className="
                                text-4xl font-extrabold
                                tracking-wide
                            "
                        >
                            Invofest
                        </h2>

                    </div>

                    {/* MENU */}
                    <nav className="flex flex-col gap-4">

                        <NavLink
                            to="/dashboard"
                            end
                            className={menuClass}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/dashboard/category"
                            className={menuClass}
                        >
                            Kategori Event
                        </NavLink>

                        <NavLink
                            to="/dashboard/event"
                            className={menuClass}
                        >
                            Event
                        </NavLink>

                        <NavLink
                            to="/dashboard/pembicara"
                            className={menuClass}
                        >
                            Pembicara
                        </NavLink>

                        <NavLink
                            to="/dashboard/biodata"
                            className={menuClass}
                        >
                            Biodata
                        </NavLink>

                        <NavLink
                            to="/dashboard/user"
                            className={menuClass}
                        >
                            User
                        </NavLink>

                    </nav>

                </div>

                {/* LOGOUT */}
                <div className="pt-6 border-t border-white/10">

                    <button
                        onClick={handleLogout}
                        type="button"
                        className="
                            w-full py-4
                            rounded-2xl

                            bg-white text-red-700
                            font-bold text-lg

                            hover:bg-red-100
                            hover:scale-[1.01]

                            transition-all duration-300
                            shadow-lg
                        "
                    >
                        Logout
                    </button>

                </div>

            </aside>

            {/* CONTENT */}
            <main
                className="
                    flex-1 min-h-screen

                    bg-gradient-to-br
                    from-red-50
                    via-white
                    to-red-100
                "
            >

                <div className="w-full h-full">

                    <Outlet />

                </div>

            </main>

        </div>

    );

}