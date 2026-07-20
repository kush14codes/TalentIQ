import { User, Mail, Phone } from "lucide-react";

function CandidateCard({ candidate }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <User
          size={30}
          className="text-cyan-400"
        />

        <h2 className="text-2xl font-bold text-white">
          Candidate Information
        </h2>

      </div>

      {/* Candidate Name */}

      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-900/70 p-5">

        <div className="rounded-xl bg-cyan-500/10 p-3">

          <User
            size={22}
            className="text-cyan-400"
          />

        </div>

        <div>

          <p className="text-sm text-slate-400">
            Full Name
          </p>

          <h3 className="text-lg font-semibold text-white">
            {candidate?.name || "Not Detected"}
          </h3>

        </div>

      </div>

      {/* Email */}

      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-900/70 p-5">

        <div className="rounded-xl bg-cyan-500/10 p-3">

          <Mail
            size={22}
            className="text-cyan-400"
          />

        </div>

        <div>

          <p className="text-sm text-slate-400">
            Email Address
          </p>

          <h3 className="text-lg font-semibold text-white break-all">
            {candidate?.email || "Not Detected"}
          </h3>

        </div>

      </div>

      {/* Phone */}

      <div className="flex items-center gap-4 rounded-2xl bg-slate-900/70 p-5">

        <div className="rounded-xl bg-cyan-500/10 p-3">

          <Phone
            size={22}
            className="text-cyan-400"
          />

        </div>

        <div>

          <p className="text-sm text-slate-400">
            Phone Number
          </p>

          <h3 className="text-lg font-semibold text-white">
            {candidate?.phone || "Not Detected"}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default CandidateCard;