import React, { useRef } from "react";
import { Layout } from "@/components/Layout";
import { SolutionSection } from "@/components/SolutionSection";
import { NewSection } from "@/components/NewSection";
import { SectionFive } from "@/components/SectionFive";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { motion, useScroll, useTransform } from "framer-motion";
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
          <ProjectShowcase />
          <SolutionSection />
          <NewSection />
          <SectionFive />
        </div>
      </div>
    </Layout>
  );
}

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch (error) {
        console.log('Video autoplay failed, retrying...', error);
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', playVideo);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-between pt-20 pb-8 md:pt-24 md:pb-12 relative overflow-hidden">
       {/* Full Screen Video Background */}
       <div className="absolute inset-0 w-full h-full z-0">
           <video 
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover grayscale contrast-125 brightness-90 opacity-60"
          >
            <source src="/tornado.mp4" type="video/mp4" />
          </video>
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none"></div>
        </div>

      {/* Big Title */}
      <div className="w-full flex justify-start relative z-10 px-3 md:px-6">
        <h1 className="text-[22vw] md:text-[14vw] leading-[0.82] font-black tracking-[-0.03em] uppercase text-left mix-blend-difference text-white">
          DHURUV
        </h1>
      </div>

      {/* Credentials Strip - fills the gap */}
      <div className="relative z-10 px-3 md:px-6 flex-1 flex items-center">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 py-4 border-t border-b border-white/10">
          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-white" data-testid="stat-years">3+</span>
              <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider">Years Coding</span>
            </div>
            <div className="w-px h-8 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-white" data-testid="stat-projects">10+</span>
              <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider">Projects</span>
            </div>
            <div className="w-px h-8 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-white" data-testid="stat-focus">100%</span>
              <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider">Passion</span>
            </div>
          </div>
          {/* Availability */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs md:text-sm text-white/70">Available for Projects</span>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="space-y-2 relative z-10 px-3 md:px-6">
        <span className="inline-block text-[9px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-white/50 border border-white/20 px-3 py-1">
          Portfolio 2024
        </span>
        <h2 className="text-lg md:text-2xl lg:text-3xl font-normal leading-[1.2] max-w-lg tracking-tight text-white/90">
          Student & Developer specializing in Cybersecurity, Python & JavaScript
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
    <section ref={ref} className="min-h-screen pt-[50px] pb-16 md:pb-20 px-3 md:px-6 bg-black text-white flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-16 md:space-y-20">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="inline-block text-[9px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-white/50 border border-white/20 px-3 py-1">
            About Me
          </span>
          
          <div className="text-2xl md:text-4xl lg:text-5xl font-normal leading-[1.25] tracking-tight space-y-1">
             <motion.p style={{ opacity: opacity1 }} className="text-white">
               Cybersecurity is more than defense.
             </motion.p>
             <motion.p style={{ opacity: opacity2 }} className="text-white/40 transition-colors duration-500 hover:text-white/80">
               It's about understanding systems and securing the digital world.
             </motion.p>
          </div>
        </div>

        {/* Secondary Text */}
        <div className="max-w-xl ml-auto text-base md:text-lg text-white/60 font-light leading-relaxed">
          <p>
            I specialize in identifying vulnerabilities and strengthening systems against real-world threats. My focus includes{" "}
            <span className="text-white/90 border-b border-white/30 hover:border-white/60 transition-colors cursor-default">network security</span>,{" "}
            <span className="text-white/90 border-b border-white/30 hover:border-white/60 transition-colors cursor-default">ethical hacking</span>, and{" "}
            <span className="text-white/90 border-b border-white/30 hover:border-white/60 transition-colors cursor-default">system hardening</span>.
          </p>
        </div>

      </div>
    </section>
  );
}
