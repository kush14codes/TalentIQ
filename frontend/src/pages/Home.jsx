import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import DashboardShowcase from "../components/landing/DashboardShowcase";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";

function Home() {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">

      {/* Aurora Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />

        <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-blue-500/20 blur-[150px]" />

      </div>

      <div className="relative z-10">

        <Navbar />

        <Hero />

        <Features />

        <HowItWorks />

        <DashboardShowcase />

        <Testimonials />

        <CTA />

        <Footer />

      </div>

    </div>
  );
}

export default Home;