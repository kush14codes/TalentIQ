import { Brain, Loader2, Sparkles } from "lucide-react";

function LoadingAnalysis() {
  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-10 backdrop-blur">

      <div className="flex flex-col items-center">

        <div className="mb-6 rounded-full bg-cyan-500/10 p-6">

          <Loader2
            size={60}
            className="animate-spin text-cyan-400"
          />

        </div>

        <h2 className="text-3xl font-bold text-white">

          Analyzing Resume...

        </h2>

        <p className="mt-3 text-center text-slate-400">

          Please wait while our AI processes your resume and
          compares it with the job description.

        </p>

      </div>

      <div className="mt-12 space-y-5">

        <div className="flex items-center gap-4 rounded-2xl bg-slate-900/70 p-5">

          <Brain
            className="text-cyan-400"
            size={26}
          />

          <span className="text-lg text-white">
            Extracting resume information...
          </span>

        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-slate-900/70 p-5">

          <Sparkles
            className="text-cyan-400"
            size={26}
          />

          <span className="text-lg text-white">
            Detecting technical skills...
          </span>

        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-slate-900/70 p-5">

          <Loader2
            size={26}
            className="animate-spin text-cyan-400"
          />

          <span className="text-lg text-white">
            Comparing with job description...
          </span>

        </div>

      </div>

    </div>
  );
}

export default LoadingAnalysis;