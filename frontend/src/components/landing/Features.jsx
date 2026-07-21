import { motion } from "framer-motion";
import {
  ScanSearch,
  BrainCircuit,
  FileCheck,
  Briefcase,
  ChartNoAxesCombined,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "ATS Optimization",
    description:
      "Measure ATS compatibility and identify improvements before applying.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: BrainCircuit,
    title: "AI Suggestions",
    description:
      "Receive intelligent resume improvements generated using AI.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    description:
      "Compare your resume with any job description using semantic similarity.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: FileCheck,
    title: "Resume Review",
    description:
      "Analyze projects, experience, education and skills in seconds.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Analytics",
    description:
      "Track ATS score, resume match and improvement over time.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Sparkles,
    title: "Interview Prep",
    description:
      "Generate AI-powered interview questions based on your target role.",
    color: "from-pink-500 to-violet-600",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative py-28 scroll-mt-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <p className="mb-4 font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Features
          </p>

          <h2 className="text-5xl font-black text-white">
            Everything you need to
            <span className="block bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Land Your Next Job
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            TalentIQ combines modern AI, resume intelligence,
            semantic search and career insights into one platform.
          </p>

        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >

                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color}`}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="leading-8 text-slate-400">
                  {feature.description}
                </p>

                <div
                  className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${feature.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-30`}
                />

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}

export default Features;