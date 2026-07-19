import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

function CTA() {
  return (
    <section className="py-32">

      <div className="mx-auto max-w-5xl px-6">

        <div className="overflow-hidden rounded-[40px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 p-16 text-center backdrop-blur-xl">

          <h2 className="text-5xl font-black">

            Ready To Build A

            <span className="block bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">

              Winning Resume?

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">

            Upload your resume, compare it with any job description
            and receive AI-powered career insights in seconds.

          </p>

          <Button className="mx-auto mt-12 flex items-center gap-2">

            Start Free Analysis

            <ArrowRight size={18} />

          </Button>

        </div>

      </div>

    </section>
  );
}

export default CTA;