import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  LayoutDashboard,
  FileSearch,
  Home,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const location = useLocation();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      label: "Home",
      icon: <Home size={18} />,
      route: "/",
    },
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      route: "/dashboard",
    },
    {
      label: "Resume Analysis",
      icon: <FileSearch size={18} />,
      route: "/resume-analysis",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background Glow */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      </div>

      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          {/* Logo */}

          <button
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-cyan-400 transition hover:text-cyan-300"
          >
            TalentIQ
          </button>

          {/* Navigation */}

          <nav className="hidden items-center gap-3 lg:flex">

            {navItems.map((item) => (

              <button
                key={item.route}
                onClick={() => navigate(item.route)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 transition ${
                  location.pathname === item.route
                    ? "bg-cyan-500 text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >

                {item.icon}

                {item.label}

              </button>

            ))}

          </nav>

          {/* Right Side */}

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/70 px-4 py-2">

              <User size={18} />

              <span className="text-sm font-medium">

                {user?.name || "User"}

              </span>

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-medium transition hover:bg-red-500"
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        </div>

      </header>

      {/* Page */}

      <main className="relative z-10 mx-auto max-w-7xl px-8 py-10">

        {children ? children : <Outlet />}

      </main>

    </div>
  );
}

export default DashboardLayout;