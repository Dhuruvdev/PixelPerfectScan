import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import Lenis from "lenis";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { name: "About", href: "#" },
  { name: "Work", href: "#" },
  { name: "Services", href: "#" },
  { name: "Contact", href: "#" },
];

export function Layout({ children }: LayoutProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progressPercent, setProgressPercent] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgressPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 ease-in-out",
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent mix-blend-difference"
        )}
      >
        <div className="text-2xl font-bold tracking-tighter uppercase font-sans text-white">
          HackFirst
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="relative text-xs font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-white hover:opacity-70 transition-opacity">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 text-[10px] font-mono uppercase tracking-widest mix-blend-difference text-white/70 bg-background/0 backdrop-blur-[2px]">
        <div className="flex items-center gap-2">
          <div className="w-12 tabular-nums">
            {progressPercent}%
          </div>
          {/* Progress Bar Visual */}
          <div className="w-20 h-[2px] bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-white"
              style={{ scaleX, transformOrigin: "0%" }} 
            />
          </div>
        </div>
        
        <div className="opacity-70">
          Design by .Cassari
        </div>
      </footer>
    </div>
  );
}
