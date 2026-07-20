import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function AuthLayout({
  title,
  subtitle,
  icon,
  children,
  footerText,
  footerLinkText,
  footerLinkTo,
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-12">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl"></div>

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl"></div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center">
            {icon && (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                {icon}
              </div>
            )}

            <h1 className="mt-6 text-center text-4xl font-bold text-white">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-2 text-center text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          <div className="mt-8">
            {children}
          </div>

          {footerText && footerLinkText && footerLinkTo && (
            <div className="mt-8 text-center text-slate-400">
              {footerText}{" "}
              <Link
                to={footerLinkTo}
                className="font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                {footerLinkText}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default AuthLayout;