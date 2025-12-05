import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import Lenis from "lenis";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { name: "ABOUT", href: "#about" },
  { name: "WORK", href: "#work" },
  { name: "CONTACT", href: "#contact" },
];

export function Layout({ children }: LayoutProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          touchMultiplier: 2,
          wrapper: window as any,
          content: document.documentElement,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
          lenis.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        };

        rafRef.current = requestAnimationFrame(raf);
        setIsReady(true);
      } catch (error) {
        console.error('Lenis initialization error:', error);
        setIsReady(true);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem && lenisRef.current) {
      lenisRef.current.scrollTo(elem, {
        offset: 0,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

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
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-6 py-6 transition-all duration-500 ease-in-out",
          // Transparent overlay that doesn't overlap visually with a solid block, but adds readability when scrolled if needed.
          // User requested "transparent not overlapping", so we keep it transparent but maybe add a very subtle gradient or just rely on text shadow/mix-blend
          isScrolled ? "bg-black/0 backdrop-blur-none" : "bg-transparent"
        )}
      >
        <div className="text-xl font-bold tracking-tighter font-sans text-white mix-blend-difference pointer-events-auto cursor-pointer" onClick={() => lenisRef.current?.scrollTo(0)}>
          dhuruv.dev
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col items-end gap-2 text-right pointer-events-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs md:text-sm font-mono uppercase tracking-widest text-white/80 hover:text-white transition-colors mix-blend-difference cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Footer progressPercent={progressPercent} scaleX={scaleX} handleNavClick={handleNavClick} />
    </div>
  );
}

function Footer({ progressPercent, scaleX, handleNavClick }: { progressPercent: number, scaleX: any, handleNavClick: any }) {
  return (
    <footer id="contact" className="relative bg-black text-white pt-20 pb-4 px-6 overflow-hidden border-t border-white/10">
      {/* Top Small Text */}
      <div className="w-full text-center mb-16">
         <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50">
           DHURUV IS A PROUD MEMBER OF THE FEARSOFF ALLIANCE
         </p>
      </div>

      {/* Big Title */}
      <div className="w-full mb-20">
        <h1 className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase text-center mix-blend-difference">
          DHURUV
        </h1>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 max-w-7xl mx-auto mb-24">

        {/* About Column */}
        <div className="md:col-span-6 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
            ABOUT
          </h3>
          <p className="text-xl md:text-2xl font-sans font-light leading-relaxed text-white/80 uppercase max-w-md">
            DHURUV: OUTSMARTING BUGS. SECURING TOMORROW. AT DHURUV, WE DON'T JUST CODE—WE CREATE.
          </p>
        </div>

        {/* Spacers */}
        <div className="hidden md:block md:col-span-2"></div>

        {/* Socials Column */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
            SOCIALS
          </h3>
          <ul className="space-y-4">
            {['FACEBOOK', 'LINKEDIN', 'X'].map((social) => (
              <li key={social} className="flex items-center gap-3 group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-white transition-colors group-hover:bg-white"></span>
                <span className="text-sm font-mono tracking-wider group-hover:text-white transition-colors">{social}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-white/50">
            NAVIGATION
          </h3>
          <ul className="space-y-4">
            {[
              { name: 'HOME', href: '#home' },
              { name: 'WORK', href: '#work' },
              { name: 'ABOUT', href: '#about' },
              { name: 'CONTACT', href: '#contact' }
            ].map((item) => (
              <li key={item.name} className="flex items-center gap-3 group cursor-pointer">
                <span className="w-1.5 h-1.5 bg-white transition-colors group-hover:bg-white"></span>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-mono tracking-wider group-hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-12 tabular-nums text-xs font-mono text-white/50">
            {progressPercent}%
          </div>
           {/* Progress Bar Visual */}
           <div className="w-20 h-[2px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-white"
              style={{ scaleX, transformOrigin: "0%" }}
            />
          </div>
        </div>

        <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">
          DESIGN BY DHURUV
        </div>
      </div>
    </footer>
  );
}