import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import solutionVideo from "@assets/solution-03_(2)_1764779271496.mp4";

gsap.registerPlugin(ScrollTrigger);

export function SolutionSection() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top", // Pin trigger
        end: "+=100%", // Scroll distance
        pin: true, // Pin the section
        scrub: 1, // Smooth scrubbing
      },
    });

    // Initial State: Video is blurry and transparent
    gsap.set(videoRef.current, { 
      filter: "blur(20px)",
      opacity: 0,
      scale: 1.1 
    });

    // Animation sequence
    tl.to(videoRef.current, {
      filter: "blur(0px)",
      opacity: 0.6,
      scale: 1,
      duration: 2,
      ease: "power2.out"
    })
    .fromTo(
      [labelRef.current, headingRef.current],
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.2, duration: 1.5, ease: "power2.out" },
      "-=1" // Overlap with video animation
    );

  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Video Background - Full Cover */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          src={solutionVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Red tint overlay to match screenshot */}
        <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />
      </div>

      {/* Content - Centered */}
      <div ref={textRef} className="relative z-10 container mx-auto px-4 text-center">
        <p 
          ref={labelRef}
          className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-gray-400 mb-6"
        >
          The Solution
        </p>
        <h2 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-sans font-medium leading-tight tracking-tight max-w-5xl mx-auto text-balance"
        >
          Security audits give you peace of mind
        </h2>
      </div>
    </section>
  );
}
