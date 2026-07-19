import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500 shadow-lg shadow-blue-500/30">
        <BrainCircuit className="h-7 w-7 text-white" />
      </div>

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          TalentIQ
        </h1>

        <p className="-mt-1 text-xs text-slate-400">
          Resume Intelligence
        </p>
      </div>
    </Link>
  );
}

export default Logo;