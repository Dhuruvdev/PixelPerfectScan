import React, { useRef } from "react";
import { Layout } from "@/components/Layout";
import { SolutionSection } from "@/components/SolutionSection";
import { NewSection } from "@/components/NewSection";
import { SectionFive } from "@/components/SectionFive";
import { motion, useScroll, useTransform } from "framer-motion";
import tornadoVideo from "@assets/tornado-home_1764776962349.mp4";
import glitchImage from "@assets/generated_images/dark_abstract_digital_glitch_art_for_cyber_security_website.png";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <Layout>
      <div ref={containerRef} className="relative bg-black">
        <div id="home">
          <HeroSection />
        </div>
        <div id="about">
          <IntroductionSection />
        </div>
        <div id="work">
          <SolutionSection />
          <NewSection />
          <SectionFive />
        </div>
      </div>
    </Layout>
  );
}

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-between pt-24 pb-24 px-4 relative overflow-hidden">
       {/* Full Screen Video Background */}
       <div className="absolute inset-0 w-full h-full z-0">
           <video 
            src={tornadoVideo} 
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover grayscale contrast-125 brightness-90 opacity-60"
          />
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none"></div>
        </div>

      {/* Big Title */}
      <div className="w-full flex justify-center md:justify-start relative z-10">
        <h1 className="text-[12vw] md:text-[10vw] leading-[0.8] font-bold tracking-tighter uppercase text-center md:text-left mix-blend-difference text-white">
          DHURUV
        </h1>
      </div>

      {/* Bottom Text */}
      <div className="space-y-4 relative z-10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-white/70">
          Portfolio
        </h3>
        <h2 className="text-3xl md:text-5xl font-sans font-normal leading-tight text-balance max-w-2xl tracking-tight text-white">
          17 Year Old Student & Developer: Cybersecurity, Python, JS
        </h2>
      </div>
    </section>
  );
}

function IntroductionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"]
  });
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0.2, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.5], [0.2, 1]);

  return (
    <section ref={ref} className="min-h-screen py-24 px-4 bg-black text-white flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-24">
        
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8">
            Skills
          </h3>
          
          <div className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight space-y-2">
             <motion.p style={{ opacity: opacity1 }} className="text-white">
               Cybersecurity is about more than just defense.
             </motion.p>
             <motion.p style={{ opacity: opacity2 }} className="text-white/40 transition-colors duration-500 hover:text-white/90">
               It's about understanding systems, finding vulnerabilities, and securing the digital world.
             </motion.p>
          </div>
        </div>

        {/* Secondary Text */}
        <div className="max-w-2xl ml-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
          <p>
            I specialize in identifying vulnerabilities and strengthening systems against real-world threats. My focus includes{" "}
            <span className="text-white border-b border-white/30 hover:border-white transition-colors cursor-default">network security</span>,{" "}
            <span className="text-white border-b border-white/30 hover:border-white transition-colors cursor-default">ethical hacking</span>, and{" "}
            <span className="text-white border-b border-white/30 hover:border-white transition-colors cursor-default">system hardening</span>.
          </p>
        </div>

      </div>
    </section>
  );
}
