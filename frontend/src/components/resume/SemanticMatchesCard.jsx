import { Brain, ArrowRight } from "lucide-react";

function SemanticMatchesCard({ semanticMatches = [] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-violet-500/10 p-3">

          <Brain
            size={28}
            className="text-violet-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Semantic AI Matches
          </h2>

          <p className="text-slate-400">
            Similar skills detected using Sentence Transformers.
          </p>

        </div>

      </div>

      {semanticMatches.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center">

          <p className="text-slate-400">
            No semantic matches found.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {semanticMatches.map((match, index) => (

            <div
              key={index}
              className="rounded-2xl bg-slate-900/70 p-5"
            >

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div className="flex items-center gap-3">

                  <span className="rounded-xl bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-400">

                    {match.resume_skill}

                  </span>

                  <ArrowRight
                    className="text-slate-500"
                    size={18}
                  />

                  <span className="rounded-xl bg-violet-500/10 px-4 py-2 font-semibold text-violet-400">

                    {match.job_skill}

                  </span>

                </div>

                <div className="min-w-[120px]">

                  <div className="mb-2 flex justify-between text-sm">

                    <span className="text-slate-400">
                      Similarity
                    </span>

                    <span className="font-semibold text-white">
                      {(match.similarity * 100).toFixed(1)}%
                    </span>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-slate-700">

                    <div
                      className="h-full rounded-full bg-violet-500 transition-all duration-700"
                      style={{
                        width: `${match.similarity * 100}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default SemanticMatchesCard;