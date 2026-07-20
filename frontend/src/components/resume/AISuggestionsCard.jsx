function AISuggestionsCard({ suggestions }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Resume Improvements
      </h2>

      <div className="rounded-2xl bg-slate-900/70 p-6">
        <ul className="space-y-4">
          {(suggestions || []).map((item, index) => (
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
  );
}

export default AISuggestionsCard;