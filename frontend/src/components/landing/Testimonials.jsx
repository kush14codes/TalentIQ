    import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Data Analyst",
    company: "FinTech",
    review:
      "TalentIQ instantly highlighted the missing skills in my resume. It helped me tailor my applications much better.",
  },
  {
    name: "Ananya Patel",
    role: "Software Engineer",
    company: "Startup",
    review:
      "The AI recommendations were surprisingly practical. The ATS score gave me confidence before applying.",
  },
  {
    name: "Aman Gupta",
    role: "ML Engineer",
    company: "AI Company",
    review:
      "The semantic job matching feature is my favorite. It feels like having an AI career coach.",
  },
];

function Testimonials() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">
          <p className="mb-4 font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Testimonials
          </p>

          <h2 className="text-5xl font-black">
            Loved By
            <span className="block bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Job Seekers
            </span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            >

              <div className="mb-5 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-8 text-slate-300">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h3 className="text-xl font-bold">
                  {item.name}
                </h3>

                <p className="text-slate-400">
                  {item.role}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;