import { Lightbulb, CheckCircle2 } from "lucide-react";

function RecommendationsCard({ recommendations = [] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-yellow-500/10 p-3">

          <Lightbulb
            size={28}
            className="text-yellow-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            AI Recommendations
          </h2>

          <p className="text-slate-400">
            Suggestions to improve your ATS compatibility.
          </p>

        </div>

      </div>

      {/* Recommendations */}

      {recommendations.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center">

          <p className="text-slate-400">
            No recommendations available.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {recommendations.map((recommendation, index) => (

            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl bg-slate-900/70 p-5 transition hover:bg-slate-800"
            >

              <CheckCircle2
                size={22}
                className="mt-0.5 shrink-0 text-green-400"
              />

              <p className="leading-7 text-slate-300">
                {recommendation}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default RecommendationsCard;