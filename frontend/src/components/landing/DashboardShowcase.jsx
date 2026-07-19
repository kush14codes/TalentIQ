import { motion } from "framer-motion";
import {
  CheckCircle2,
  CircleAlert,
  BrainCircuit,
  ChartSpline,
  Sparkles,
} from "lucide-react";

function DashboardShowcase() {
  return (
    <section className="py-32">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >

          <p className="mb-4 font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Dashboard Preview
          </p>

          <h2 className="text-5xl font-black">
            Everything You Need
            <span className="block bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              In One Dashboard
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Instantly visualize ATS compatibility, resume match,
            missing skills and AI-powered recommendations.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="rounded-[36px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl bg-slate-900 p-7">

              <p className="text-slate-400">
                ATS Score
              </p>

              <h1 className="mt-3 text-6xl font-black text-cyan-400">
                91%
              </h1>

              <div className="mt-6 h-3 rounded-full bg-slate-700">

                <div className="h-3 w-[91%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />

              </div>

            </div>

            <div className="rounded-3xl bg-slate-900 p-7">

              <p className="text-slate-400">
                Resume Match
              </p>

              <h1 className="mt-3 text-6xl font-black text-violet-400">
                88%
              </h1>

              <div className="mt-6 h-3 rounded-full bg-slate-700">

                <div className="h-3 w-[88%] rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />

              </div>

            </div>

            <div className="rounded-3xl bg-slate-900 p-7">

              <div className="flex items-center gap-3">

                <ChartSpline className="text-emerald-400" />

                <p className="text-slate-300">
                  Resume Health
                </p>

              </div>

              <div className="mt-8 flex items-center justify-center">

                <div className="flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-emerald-500">

                  <span className="text-5xl font-black">
                    A+
                  </span>

                </div>

              </div>

            </div>

          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">

            <div className="rounded-3xl bg-slate-900 p-8">

              <div className="mb-6 flex items-center gap-3">

                <CheckCircle2 className="text-emerald-400" />

                <h3 className="text-2xl font-bold">
                  Skills Found
                </h3>

              </div>

              <div className="flex flex-wrap gap-3">

                {[
                  "Python",
                  "SQL",
                  "Machine Learning",
                  "FastAPI",
                  "React",
                  "Pandas",
                  "NumPy",
                  "Scikit-learn",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

            <div className="rounded-3xl bg-slate-900 p-8">

              <div className="mb-6 flex items-center gap-3">

                <CircleAlert className="text-orange-400" />

                <h3 className="text-2xl font-bold">
                  Missing Skills
                </h3>

              </div>

              <div className="flex flex-wrap gap-3">

                {[
                  "Docker",
                  "AWS",
                  "Kubernetes",
                  "CI/CD",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-orange-500/20 px-4 py-2 text-sm text-orange-300"
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-3xl bg-slate-900 p-8">

            <div className="mb-6 flex items-center gap-3">

              <BrainCircuit className="text-cyan-400" />

              <h3 className="text-2xl font-bold">
                AI Recommendations
              </h3>

            </div>

            <div className="space-y-4">

              {[
                "Quantify project impact with measurable metrics.",
                "Add cloud technologies like AWS or Azure.",
                "Improve ATS keyword alignment.",
                "Highlight leadership and teamwork achievements.",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-800 p-4"
                >

                  <Sparkles className="mt-1 h-5 w-5 text-cyan-400" />

                  <p className="text-slate-300">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default DashboardShowcase;