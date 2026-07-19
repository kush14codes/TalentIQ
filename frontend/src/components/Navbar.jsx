import { Link, NavLink } from "react-router-dom";
import { BrainCircuit, Menu } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";

function Navbar() {
  return (
    <header className="sticky top-4 z-50">
      <Container>
        <div className="flex h-20 items-center justify-between rounded-3xl border border-white/10 bg-slate-900/60 px-8 backdrop-blur-3xl shadow-2xl shadow-cyan-500/5">

          <Link to="/" className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 shadow-lg shadow-cyan-500/30">

              <BrainCircuit className="h-7 w-7 text-white" />

            </div>

            <div>

              <h1 className="text-2xl font-black tracking-tight text-white">
                TalentIQ
              </h1>

              <p className="-mt-1 text-xs tracking-widest text-slate-400">
                AI Resume Intelligence
              </p>

            </div>

          </Link>

          <nav className="hidden items-center gap-8 md:flex">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            <a
              href="#features"
              className="text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-slate-300 transition hover:text-white"
            >
              Workflow
            </a>

          </nav>

          <div className="hidden items-center gap-3 md:flex">

            <Link to="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button>
                Get Started
              </Button>
            </Link>

          </div>

          <button className="text-white md:hidden">
            <Menu />
          </button>

        </div>
      </Container>
    </header>
  );
}

export default Navbar;