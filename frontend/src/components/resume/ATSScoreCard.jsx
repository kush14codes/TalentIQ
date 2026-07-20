import { BarChart3 } from "lucide-react";

function ATSScoreCard({ score }) {
  const getScoreColor = () => {
    if (score >= 80) {
      return "text-green-400";
    }

    if (score >= 60) {
      return "text-yellow-400";
    }

    return "text-red-400";
  };

  const getProgressColor = () => {
    if (score >= 80) {
      return "bg-green-400";
    }

    if (score >= 60) {
      return "bg-yellow-400";
    }

    return "bg-red-400";
  };

  const getStatus = () => {
    if (score >= 80) {
      return "Excellent Match";
    }

    if (score >= 60) {
      return "Good Match";
    }

    return "Needs Improvement";
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <BarChart3
          size={30}
          className="text-cyan-400"
        />

        <h2 className="text-2xl font-bold text-white">
          ATS Compatibility Score
        </h2>

      </div>

      {/* Score */}

      <div className="flex flex-col items-center">

        <div
          className={`text-7xl font-extrabold ${getScoreColor()}`}
        >
          {score}%
        </div>

        <p className="mt-3 text-lg text-slate-400">
          {getStatus()}
        </p>

      </div>

      {/* Progress Bar */}

      <div className="mt-10">

        <div className="mb-2 flex justify-between text-sm text-slate-400">

          <span>Match Score</span>

          <span>{score}%</span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-800">

          <div
            className={`h-full rounded-full transition-all duration-700 ${getProgressColor()}`}
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>

      {/* Legend */}

      <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">

        <div className="rounded-xl bg-red-500/10 p-3">

          <p className="font-semibold text-red-400">
            0 - 59%
          </p>

          <p className="mt-1 text-slate-400">
            Low
          </p>

        </div>

        <div className="rounded-xl bg-yellow-500/10 p-3">

          <p className="font-semibold text-yellow-400">
            60 - 79%
          </p>

          <p className="mt-1 text-slate-400">
            Good
          </p>

        </div>

        <div className="rounded-xl bg-green-500/10 p-3">

          <p className="font-semibold text-green-400">
            80 - 100%
          </p>

          <p className="mt-1 text-slate-400">
            Excellent
          </p>

        </div>

      </div>

    </div>
  );
}

export default ATSScoreCard;