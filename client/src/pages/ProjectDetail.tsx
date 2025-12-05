import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, ExternalLink, Download, Calendar, Monitor, FileArchive } from "lucide-react";
import { projects, type Project } from "@/components/WorkShowcase";

export default function ProjectDetail() {
  const [, params] = useRoute("/work/:id");
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const project = projects.find(p => p.id === params?.id);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 0.9]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-white/60 text-lg mb-4">Project not found</p>
          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black">
      <motion.div 
        ref={imageRef}
        className="relative h-screen sticky top-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black"
          style={{ opacity: overlayOpacity }}
        />

        <motion.button
          onClick={() => setLocation("/")}
          className="absolute top-6 left-6 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            style={{ y: titleY }}
            className="max-w-4xl"
          >
            <motion.span 
              className="inline-block text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-cyan-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {project.category}
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              data-testid="text-project-title"
            >
              {project.title}
            </motion.h1>

            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {project.tools.map((tool, idx) => (
                <motion.span
                  key={tool}
                  className="text-xs md:text-sm px-4 py-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 text-cyan-300/90 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.4 }}
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="relative z-10 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">About the Project</h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed" data-testid="text-project-description">
              {project.fullDescription || project.description}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {project.platform && (
              <div className="p-6 border border-white/10 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Monitor className="w-5 h-5 text-cyan-400" />
                  <span className="text-white/50 text-sm uppercase tracking-wider">Platform</span>
                </div>
                <p className="text-white text-lg" data-testid="text-platform">{project.platform}</p>
              </div>
            )}
            
            {project.downloadSize && (
              <div className="p-6 border border-white/10 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <FileArchive className="w-5 h-5 text-cyan-400" />
                  <span className="text-white/50 text-sm uppercase tracking-wider">Size</span>
                </div>
                <p className="text-white text-lg" data-testid="text-size">{project.downloadSize}</p>
              </div>
            )}
            
            {project.releaseDate && (
              <div className="p-6 border border-white/10 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span className="text-white/50 text-sm uppercase tracking-wider">Released</span>
                </div>
                <p className="text-white text-lg" data-testid="text-release">{project.releaseDate}</p>
              </div>
            )}
          </motion.div>

          {project.features && project.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Features</h2>
              <div className="space-y-4">
                {project.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 p-4 border border-white/10 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 text-sm font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-white/80 text-lg" data-testid={`text-feature-${idx}`}>{feature}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {project.link && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-download"
              >
                <Download className="w-5 h-5" />
                Download Game
              </motion.a>
              
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="button-view-itch"
              >
                <ExternalLink className="w-5 h-5" />
                View on itch.io
              </motion.a>
            </motion.div>
          )}
        </div>

        <motion.div
          className="border-t border-white/10 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto px-6 md:px-8 flex items-center justify-between">
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors"
              data-testid="button-back-bottom"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all projects
            </button>
            
            <span className="text-white/30 text-sm font-mono">
              {project.category}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
