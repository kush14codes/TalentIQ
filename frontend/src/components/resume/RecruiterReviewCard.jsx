function RecruiterReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
      <h2 className="mb-8 text-2xl font-bold text-white">
        Recruiter Review
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-slate-900/70 p-6">
          <h3 className="mb-4 text-xl font-semibold text-green-400">
            Strengths
          </h3>

          <ul className="space-y-3">
            {(review.strengths || []).map((item, index) => (
              <li
                key={index}
                className="text-slate-300"
              >
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-slate-900/70 p-6">
          <h3 className="mb-4 text-xl font-semibold text-red-400">
            Weaknesses
          </h3>

          <ul className="space-y-3">
            {(review.weaknesses || []).map((item, index) => (
              <li
                key={index}
                className="text-slate-300"
              >
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-cyan-500/10 p-6">
        <p className="text-sm text-slate-400">
          Hiring Recommendation
        </p>

        <h3 className="mt-2 text-2xl font-bold text-cyan-400">
          {review.recommendation}
        </h3>
      </div>
    </div>
  );
}

export default RecruiterReviewCard;