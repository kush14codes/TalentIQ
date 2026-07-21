import Logo from "./ui/Logo";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:flex-row">

        {/* Logo */}
        <Logo />

        {/* Copyright */}
        <div className="text-center lg:text-left">
          <p className="text-slate-400">
            © 2026{" "}
            <span className="font-semibold text-white">TalentIQ</span>. Built by{" "}
            <span className="font-semibold text-cyan-400">
              Kushagra Chaubey
            </span>.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            AI Resume Intelligence Platform powered by React, FastAPI,
            Sentence Transformers and Groq LLM.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/kush14codes"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-300 transition hover:text-cyan-400"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/kushagra-chaubey-a86049291/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-300 transition hover:text-cyan-400"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;