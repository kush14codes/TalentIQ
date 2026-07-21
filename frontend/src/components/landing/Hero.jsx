import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../ui/Container";
import Button from "../ui/Button";
import DashboardPreview from "./DashboardPreview";

function Hero() {
  return (
    <section className="relative">
      <Container>
        <div className="grid min-h-[88vh] items-center gap-16 py-12 lg:grid-cols-2">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 backdrop-blur-xl">

              <Sparkles
                size={16}
                className="text-cyan-400"
              />

              <span className="text-sm font-medium tracking-wide text-cyan-300">
                AI Powered Resume Intelligence
              </span>

            </div>

            <h1 className="text-6xl font-black leading-[1.05] tracking-tight lg:text-8xl">

              Land Your

              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                Dream Job
              </span>

              <span className="block">
                With AI
              </span>

            </h1>

            <p className="mt-10 max-w-xl text-lg leading-8 text-slate-400">

              TalentIQ helps you analyse your resume against any job
              description using AI.

              <br />
              <br />

              Discover ATS compatibility, missing skills, semantic
              similarity, AI suggestions and interview questions —
              all in one place.

            </p>

            {/* Buttons */}

            <div className="mt-12 flex flex-wrap gap-5">

              <Link to="/dashboard">

                <Button className="group">

                  Analyze Resume

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Button>

              </Link>

              <a href="#workflow">

                <Button variant="secondary">

                  <PlayCircle size={18} />

                  Watch Demo

                </Button>

              </a>

            </div>

            {/* Stats */}

            <div className="mt-20 grid grid-cols-3 gap-8">

              <div>

                <h2 className="text-5xl font-black text-cyan-400">
                  91%
                </h2>

                <p className="mt-3 text-sm uppercase tracking-wider text-slate-400">
                  ATS Match
                </p>

              </div>

              <div>

                <h2 className="text-5xl font-black text-violet-400">
                  AI
                </h2>

                <p className="mt-3 text-sm uppercase tracking-wider text-slate-400">
                  Insights
                </p>

              </div>

              <div>

                <h2 className="text-5xl font-black text-blue-400">
                  PDF
                </h2>

                <p className="mt-3 text-sm uppercase tracking-wider text-slate-400">
                  Resume Upload
                </p>

              </div>

            </div>

          </motion.div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative"
          >

            <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px]" />

            <div className="absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-violet-600/20 blur-[120px]" />

            <DashboardPreview />

          </motion.div>

        </div>
      </Container>
    </section>
  );
}

export default Hero;