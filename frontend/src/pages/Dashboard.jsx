import { useNavigate } from "react-router-dom";
import {
  Brain,
  ArrowRight,
  BarChart3,
  Sparkles,
  FileSearch,
  Clock,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const features = [
    {
      title: "AI Resume Analysis",
      description:
        "Upload your resume and compare it with any job description using our AI-powered ATS engine.",
      icon: <Brain size={30} />,
      action: "Analyze Resume",
      route: "/resume-analysis",
    },
    {
      title: "ATS Score",
      description:
        "See how well your resume matches the job requirements before applying.",
      icon: <BarChart3 size={30} />,
    },
    {
      title: "Skill Gap Detection",
      description:
        "Discover which skills are missing and what recruiters expect.",
      icon: <FileSearch size={30} />,
    },
  ];

  return (
    <DashboardLayout>
      {/* Hero */}

      <section className="mb-12">

        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300">

          <Sparkles size={16} />

          AI Powered Resume Intelligence

        </div>

        <h1 className="mt-6 text-5xl font-bold leading-tight">

          Welcome back,

          <span className="text-cyan-400">

            {" "}

            {user?.name || "User"}

          </span>

          👋

        </h1>

        <p className="mt-5 max-w-3xl text-lg text-slate-400">

          Optimize your resume with AI, compare it against any job description,
          calculate your ATS score, identify missing skills, and receive
          intelligent recommendations.

        </p>

      </section>

      {/* Main CTA */}

      <section className="mb-14">

        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 to-slate-900 p-10">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>

              <h2 className="text-3xl font-bold">

                Analyze Your Resume

              </h2>

              <p className="mt-3 max-w-xl text-slate-300">

                Upload your resume, paste the job description, and let TalentIQ
                instantly calculate your ATS score with AI.

              </p>

            </div>

            <button
              onClick={() => navigate("/resume-analysis")}
              className="flex items-center justify-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-400"
            >

              Start Analysis

              <ArrowRight size={22} />

            </button>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="mb-14">

        <h2 className="mb-8 text-3xl font-bold">

          Platform Features

        </h2>

        <div className="grid gap-8 lg:grid-cols-3">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-cyan-500/40 hover:bg-white/10"
            >

              <div className="mb-6 inline-flex rounded-2xl bg-cyan-500/15 p-4 text-cyan-400">

                {feature.icon}

              </div>

              <h3 className="text-2xl font-semibold">

                {feature.title}

              </h3>

              <p className="mt-4 leading-7 text-slate-400">

                {feature.description}

              </p>

              {feature.route && (

                <button
                  onClick={() => navigate(feature.route)}
                  className="mt-8 flex items-center gap-2 text-cyan-400 transition hover:gap-3"
                >

                  {feature.action}

                  <ArrowRight size={18} />

                </button>

              )}

            </div>

          ))}

        </div>

      </section>

      {/* Coming Soon */}

      <section>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <div className="mb-5 flex items-center gap-3">

            <Clock className="text-cyan-400" />

            <h2 className="text-2xl font-bold">

              Coming in Sprint 6

            </h2>

          </div>

          <ul className="space-y-3 text-slate-400">

            <li>• Semantic AI skill matching using embeddings</li>

            <li>• Resume improvement recommendations</li>

            <li>• AI-generated resume summary</li>

            <li>• Recruiter feedback simulation</li>

            <li>• Interview question generation</li>

          </ul>

        </div>

      </section>

    </DashboardLayout>
  );
}

export default Dashboard;