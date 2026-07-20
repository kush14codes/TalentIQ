function AIResumeSummaryCard({ summary }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Resume Summary
      </h2>

      <div className="rounded-2xl bg-slate-900/70 p-6">
        <p className="text-base leading-8 text-slate-300 whitespace-pre-line">
          {summary || "No AI summary available."}
        </p>
      </div>
    </div>
  );
}

export default AIResumeSummaryCard;