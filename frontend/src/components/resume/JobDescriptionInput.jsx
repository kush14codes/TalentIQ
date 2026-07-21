import { Briefcase } from "lucide-react";

function JobDescriptionInput({
  jobDescription,
  setJobDescription,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

      <div className="mb-6 flex items-center gap-3">

        <Briefcase
          className="text-cyan-400"
          size={30}
        />

        <h2 className="text-2xl font-bold text-white">
          Job Description <span className="text-cyan-400">(Optional)</span>
        </h2>

      </div>

      <textarea
        rows={14}
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(e.target.value)
        }
        placeholder="Paste the job description here for Semantic ATS analysis (optional)..."
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-slate-700
          bg-slate-900/70
          p-5
          text-white
          outline-none
          transition
          placeholder:text-slate-500
          focus:border-cyan-400
          focus:ring-2
          focus:ring-cyan-400/20
        "
      />

      <div className="mt-4 flex items-center justify-between text-sm">

        <p className="text-slate-500">
          Leave this empty to get a <span className="font-semibold text-cyan-400">General ATS Score</span>, or paste a job description to receive a <span className="font-semibold text-cyan-400">Semantic ATS Match Score</span>.
        </p>

        <span className="text-slate-400">
          {jobDescription.length} Characters
        </span>

      </div>

    </div>
  );
}

export default JobDescriptionInput;