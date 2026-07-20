function InterviewQuestionsCard({ questions }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Interview Questions
      </h2>

      <div className="rounded-2xl bg-slate-900/70 p-6">
        <ol className="list-decimal space-y-4 pl-5">
          {(questions || []).map((question, index) => (
            <li
              key={index}
              className="text-slate-300"
            >
              {question}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default InterviewQuestionsCard;