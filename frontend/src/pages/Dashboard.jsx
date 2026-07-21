import { useNavigate } from "react-router-dom";
import {
  Brain,
  ArrowRight,
  BarChart3,
  Sparkles,
  FileSearch,
 CheckCircle2,
  Bot,
  Target,
  FileText,
  Lightbulb,
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
        "Analyze your resume using TalentIQ's AI engine.",
      icon: <Brain size={30} />,
      action: "Start Analysis",
      route: "/resume-analysis",
    },
    {
      title: "General ATS Score",
      description:
        "Evaluate your resume even without a Job Description.",
      icon: <BarChart3 size={30} />,
      action: "Check ATS",
      route: "/resume-analysis",
    },
    {
      title: "Semantic ATS Match",
      description:
        "Compare your resume against a specific Job Description.",
      icon: <Target size={30} />,
      action: "Match Resume",
      route: "/resume-analysis",
    },
    {
      title: "Skill Gap Detection",
      description:
        "Identify missing skills and recruiter expectations.",
      icon: <FileSearch size={30} />,
      action: "Analyze Skills",
      route: "/resume-analysis",
    },
  ];

  const capabilities = [
    {
      icon: <CheckCircle2 className="text-green-400" />,
      title: "General ATS Analysis",
    },
    {
      icon: <Target className="text-cyan-400" />,
      title: "Semantic ATS Matching",
    },
    {
      icon: <Bot className="text-violet-400" />,
      title: "AI Resume Summary",
    },
    {
      icon: <FileText className="text-blue-400" />,
      title: "Recruiter Review",
    },
    {
      icon: <Lightbulb className="text-yellow-400" />,
      title: "AI Suggestions",
    },
    {
      icon: <Brain className="text-pink-400" />,
      title: "Interview Questions",
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

          Analyze resumes, improve ATS compatibility, compare against job
          descriptions and receive AI-powered recruiter feedback in seconds.

        </p>

      </section>

      {/* Main CTA */}

      <section className="mb-14">

        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 to-slate-900 p-10">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            <div>

              <h2 className="text-3xl font-bold">

                Start Your Resume Analysis

              </h2>

              <p className="mt-3 max-w-xl text-slate-300">

                Upload your resume to receive a General ATS Score or
                optionally provide a Job Description for Semantic ATS
                matching.

              </p>

            </div>

            <button
              onClick={() => navigate("/resume-analysis")}
              className="flex items-center justify-center gap-3 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-400"
            >

              Analyze Resume

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

        <div className="grid gap-8 lg:grid-cols-2">

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

              <button
                onClick={() => navigate(feature.route)}
                className="mt-8 flex items-center gap-2 text-cyan-400 transition hover:gap-3"
              >

                {feature.action}

                <ArrowRight size={18} />

              </button>

            </div>

          ))}

        </div>

      </section>

      {/* Platform Capabilities */}

      <section>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="mb-8 text-3xl font-bold">

            Platform Capabilities

          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {capabilities.map((item) => (

              <div
                key={item.title}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-5"
              >

                {item.icon}

                <span className="font-medium text-white">

                  {item.title}

                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

    </DashboardLayout>
  );
}

export default Dashboard;