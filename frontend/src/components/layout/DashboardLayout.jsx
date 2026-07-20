import { Outlet, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background Glow */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

      </div>

      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <button
            onClick={() => navigate("/dashboard")}
            className="text-3xl font-bold text-cyan-400 transition hover:text-cyan-300"
          >
            TalentIQ
          </button>

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