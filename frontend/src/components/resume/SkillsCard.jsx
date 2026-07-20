import { CheckCircle2, XCircle, Code2 } from "lucide-react";

function SkillsCard({
  title,
  skills,
  type = "matched",
}) {
  const isMatched = type === "matched";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <Code2
          size={28}
          className="text-cyan-400"
        />

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

      </div>

      {/* Empty State */}

      {skills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 py-10 text-center">

          <p className="text-slate-400">

            No skills to display.

          </p>

        </div>
      ) : (
        <div className="flex flex-wrap gap-4">

          {skills.map((skill) => (
            <div
              key={skill}
              className={`flex items-center gap-2 rounded-full border px-5 py-3 transition
              ${
                isMatched
                  ? "border-green-500/30 bg-green-500/10 text-green-400"
                  : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}
            >
              {isMatched ? (
                <CheckCircle2 size={18} />
              ) : (
                <XCircle size={18} />
              )}

              <span className="font-medium">
                {skill}
              </span>
            </div>
          ))}

        </div>
      )}

      {/* Footer */}

      <div className="mt-8 border-t border-white/10 pt-5">

        <p className="text-sm text-slate-400">

          Total Skills:{" "}

          <span className="font-semibold text-white">
            {skills.length}
          </span>

        </p>

      </div>

    </div>
  );
}

export default SkillsCard;