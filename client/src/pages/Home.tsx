import React, { useRef } from "react";
import { Layout } from "@/components/Layout";
import { SolutionSection } from "@/components/SolutionSection";
import { NewSection } from "@/components/NewSection";
import { SectionFive } from "@/components/SectionFive";
import { WorkShowcase } from "@/components/WorkShowcase";
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
          <WorkShowcase />
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

      {/* Stats Section - Inspired by Screenshot */}
      <div className="relative z-10 px-3 md:px-6 flex-1 flex items-center">
        <div className="w-full space-y-12 md:space-y-16 py-8">
          {/* Stat 1 */}
          <div className="space-y-2">
            <div className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-none tracking-tight text-white" data-testid="stat-years">
              3+
            </div>
            <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
              ( Years Coding )
            </div>
            <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider max-w-md">
              Building and securing systems
            </div>
          </div>

          {/* Stat 2 */}
          <div className="space-y-2">
            <div className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-none tracking-tight text-white" data-testid="stat-projects">
              10+
            </div>
            <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
              ( Projects Completed )
            </div>
            <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider max-w-md">
              From security tools to web applications
            </div>
          </div>

          {/* Stat 3 */}
          <div className="space-y-2">
            <div className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-none tracking-tight text-white" data-testid="stat-focus">
              100%
            </div>
            <div className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
              ( Passion & Focus )
            </div>
            <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider max-w-md">
              Dedicated to cybersecurity excellence
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs md:text-sm font-mono text-white/70 uppercase tracking-wider">Available for Projects</span>
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
    <section ref={ref} className="min-h-screen pt-[10px] pb-8 md:pb-12 px-3 md:px-6 bg-black text-white flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full space-y-12 md:space-y-16">
        
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

        {/* Tech Stack Icons */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-8">
            Technologies & Skills
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            {/* Python */}
            <div className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all hover:bg-white/5">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 128 128" className="w-full h-full">
                  <linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
                    <stop offset="0" stopColor="#5A9FD4"/>
                    <stop offset="1" stopColor="#306998"/>
                  </linearGradient>
                  <linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)">
                    <stop offset="0" stopColor="#FFD43B"/>
                    <stop offset="1" stopColor="#FFE873"/>
                  </linearGradient>
                  <path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"/>
                  <path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"/>
                  <radialGradient id="python-original-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#B8B8B8" stopOpacity=".498"/>
                    <stop offset="1" stopColor="#7F7F7F" stopOpacity="0"/>
                  </radialGradient>
                  <path opacity=".444" fill="url(#python-original-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"/>
                </svg>
              </div>
              <span className="text-xs font-mono text-white/60 group-hover:text-white/90 transition-colors">PYTHON</span>
            </div>

            {/* JavaScript */}
            <div className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all hover:bg-white/5">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 128 128" className="w-full h-full">
                  <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/>
                  <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
                </svg>
              </div>
              <span className="text-xs font-mono text-white/60 group-hover:text-white/90 transition-colors">JAVASCRIPT</span>
            </div>

            {/* C# */}
            <div className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all hover:bg-white/5">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 128 128" className="w-full h-full">
                  <path fill="#9B4F96" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/>
                  <path fill="#68217A" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
                  <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"/>
                  <path d="M82.1 61.8h5.2v-5.3h4.4v5.3H97v4.4h-5.3v5.2h-4.4v-5.2h-5.2v-4.4zM100.6 61.8h5.2v-5.3h4.4v5.3h5.3v4.4h-5.3v5.2h-4.4v-5.2h-5.2v-4.4z" fill="#fff"/>
                </svg>
              </div>
              <span className="text-xs font-mono text-white/60 group-hover:text-white/90 transition-colors">C#</span>
            </div>

            {/* Unity */}
            <div className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all hover:bg-white/5">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 128 128" className="w-full h-full">
                  <path fill="#fff" d="M82.48 63.578l22.418-38.402 10.832 38.402-10.832 38.398zm-10.926 6.238l22.422 38.402-39.047-9.922-28.211-28.48zM93.969 18.93L71.555 57.34H26.719L54.93 28.855zm32.34 36.466L115.504-.004 61.33 1.445 37.805 26.652 27.91 57.34 16 63.582l11.91 6.246 9.895 30.688 23.52 25.207L115.5 128l10.805-54.602L138 63.582zm-7.496 53.188l-27.309-7.004-.015-.02h31.871z"/>
                </svg>
              </div>
              <span className="text-xs font-mono text-white/60 group-hover:text-white/90 transition-colors">UNITY</span>
            </div>

            {/* Cybersecurity Shield Icon */}
            <div className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all hover:bg-white/5">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="stroke-white/80 group-hover:stroke-white transition-colors"/>
                  <path d="M9 12l2 2 4-4" className="stroke-white/80 group-hover:stroke-white transition-colors" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs font-mono text-white/60 group-hover:text-white/90 transition-colors">SECURITY</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
