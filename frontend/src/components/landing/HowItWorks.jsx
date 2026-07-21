import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  BrainCircuit,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description:
      "Upload your resume in PDF format securely in seconds.",
  },
  {
    icon: FileText,
    title: "Add Job Description",
    description:
      "Paste or upload any job description you want to target.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "TalentIQ analyzes semantic similarity and ATS compatibility.",
  },
  {
    icon: BadgeCheck,
    title: "View Results",
    description:
      "See ATS score, missing skills and improvement suggestions.",
  },
  {
    icon: Sparkles,
    title: "Ace Interviews",
    description:
      "Generate personalized interview questions and career insights.",
  },
];

function HowItWorks() {
  return (
    <section
      id="workflow"
      className="relative py-28 scroll-mt-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="mb-4 font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Process
          </p>

          <h2 className="text-5xl font-black">
            How TalentIQ Works
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            From uploading your resume to receiving AI-powered insights,
            the entire workflow takes less than a minute.
          </p>
        </motion.div>

        <div className="relative">

          {/* Vertical line */}

          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-500 via-blue-500 to-violet-500 lg:block" />

          <div className="space-y-16">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -80 : 80,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                  }}
                  className={`flex items-center ${
                    index % 2 === 0
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                  } flex-col gap-10`}
                >

                  <div className="flex-1">

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2">

                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600">

                        <Icon className="h-8 w-8 text-white" />

                      </div>

                      <h3 className="mb-4 text-3xl font-bold">
                        {step.title}
                      </h3>

                      <p className="leading-8 text-slate-400">
                        {step.description}
                      </p>

                    </div>

                  </div>

                  <div className="hidden h-8 w-8 rounded-full border-4 border-slate-950 bg-cyan-400 shadow-xl shadow-cyan-400/40 lg:block" />

                  <div className="hidden flex-1 lg:block" />

                </motion.div>
              );

            })}

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;