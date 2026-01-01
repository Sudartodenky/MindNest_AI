import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "../components/landing/Navbar";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Features } from "../components/landing/Features";
import { InstallSection } from "../components/landing/InstallSection";
import { ScientificImpact } from "../components/landing/ScientificImpact";
import { FooterCTA } from "../components/landing/FooterCTA";

export function LandingPage() {
  const { scrollY } = useScroll();

  const navbarBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden text-[#1e293b]">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#a78bfa] rounded-full opacity-10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#34d399] rounded-full opacity-10 blur-[120px] animate-pulse delay-1000" />
      </div>

      <Navbar style={{ backgroundColor: navbarBg }} />

      <main className="relative z-10">
        <Hero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HowItWorks />

          <Features />

          <InstallSection />

          <ScientificImpact />

          <FooterCTA />
        </div>
      </main>
    </div>
  );
}
