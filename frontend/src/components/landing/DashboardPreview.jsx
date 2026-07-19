import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="rounded-[32px] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          AI Analysis
        </h2>

        <span className="rounded-full bg-emerald-500/20 px-4 py-1 text-sm text-emerald-400">
          Ready
        </span>
      </div>

      <div className="space-y-5">

        <div className="flex items-center justify-between rounded-2xl bg-slate-900 p-5">
          <div className="flex items-center gap-4">
            <FileText className="text-cyan-400" />
            <p className="text-slate-300">Resume Uploaded</p>
          </div>

          <CheckCircle2 className="text-emerald-400" />
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-900 p-5">
          <div className="flex items-center gap-4">
            <Briefcase className="text-violet-400" />
            <p className="text-slate-300">Job Description</p>
          </div>

          <CheckCircle2 className="text-emerald-400" />
        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <div className="mb-2 flex justify-between">
            <span className="text-slate-400">ATS Score</span>
            <span className="font-bold text-cyan-400">91%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "91%" }}
              transition={{ duration: 1.5 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"
            />
          </div>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <div className="mb-2 flex justify-between">
            <span className="text-slate-400">Resume Match</span>
            <span className="font-bold text-violet-400">88%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "88%" }}
              transition={{ duration: 1.6 }}
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-pink-500"
            />
          </div>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-400" />
            <p className="font-semibold text-white">
              Missing Skills
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <span className="rounded-full bg-blue-600 px-4 py-2 text-sm">
              Docker
            </span>

            <span className="rounded-full bg-cyan-600 px-4 py-2 text-sm">
              AWS
            </span>

            <span className="rounded-full bg-violet-600 px-4 py-2 text-sm">
              Kubernetes
            </span>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default DashboardPreview;