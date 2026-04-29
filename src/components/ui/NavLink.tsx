import { NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkProps {
  label: string;
  to: string;
  icon?: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  to,
  icon,
}) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 ${isActive
          ? "text-gray-900"
          : "text-slate-600 hover:text-red-900"
        }`
      }
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </RouterNavLink>
  );
};