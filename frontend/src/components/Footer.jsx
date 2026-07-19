import Logo from "./ui/Logo";

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 lg:flex-row">

        <Logo />

        <p className="text-slate-500">
          © 2026 TalentIQ. Built with React, FastAPI & AI.
        </p>

      </div>

    </footer>
  );
}

export default Footer;