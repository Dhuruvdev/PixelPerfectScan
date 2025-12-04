import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import hauntedParkImg from "@assets/bjZXLD_1764870631952.png";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  image: string;
  link?: string;
  fullDescription?: string;
  features?: string[];
  downloadSize?: string;
  platform?: string;
  releaseDate?: string;
}

export const projects: Project[] = [
  {
    id: "rachitroo-haunted-park",
    title: "Rachitroo Haunted Park",
    category: "Horror Game",
    description: "A thrilling survival horror game where you must escape a haunted park at 3 AM.",
    fullDescription: "Rachit went to the park at 3 AM for a video challenge, but they got trapped because Rachit saw a ghost in the park. They needed to complete a task to escape the park and stay alive.",
    tools: ["Unity", "C#", "Blender", "Horror"],
    image: hauntedParkImg,
    link: "https://dhuruvm.itch.io/rachitroo-haunted-park",
    features: [
      "Immersive 3D horror environment",
      "Task-based survival gameplay",
      "Atmospheric sound design",
      "Multiple scare events"
    ],
    downloadSize: "85 MB",
    platform: "Windows, Linux",
    releaseDate: "Jun 12, 2024"
  },
];

export function WorkShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [, setLocation] = useLocation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const nextProject = () => {
    if (!isTransitioning && projects.length > 1) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % projects.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const prevProject = () => {
    if (!isTransitioning && projects.length > 1) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const handleProjectClick = (project: Project, e: React.MouseEvent) => {
    setClickPosition({
      x: e.clientX,
      y: e.clientY
    });
    setSelectedProject(project);
    
    setTimeout(() => {
      setLocation(`/work/${project.id}`);
    }, 1000);
  };

  const handleKeyDown = (project: Project, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setClickPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
      setSelectedProject(project);
      
      setTimeout(() => {
        setLocation(`/work/${project.id}`);
      }, 1000);
    }
  };

  const currentProject = projects[currentIndex];

  return (
    <>
      <section 
        ref={containerRef}
        className="py-16 md:py-24 px-4 md:px-8 bg-black min-h-screen relative overflow-hidden" 
        id="work"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }}
            className="mb-12 md:mb-20"
          >
            <span className="inline-block text-[9px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-white/50 border border-white/20 px-3 py-1 mb-4">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">My </span>
              <span className="text-purple-500">Work</span>
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -30 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="cursor-pointer group"
                onClick={(e) => handleProjectClick(currentProject, e)}
                onKeyDown={(e) => handleKeyDown(currentProject, e)}
                tabIndex={0}
                role="button"
                aria-label={`View ${currentProject.title} project details`}
                data-testid={`showcase-card-${currentProject.id}`}
              >
                <div className="relative rounded-lg overflow-hidden border border-white/10">
                  <div className="aspect-video relative overflow-hidden">
                    <motion.img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.05 }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    <motion.div 
                      className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
                      </div>
                    </motion.div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <span className="inline-block text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-purple-400 mb-2">
                          {currentProject.category}
                        </span>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300" data-testid={`showcase-title-${currentProject.id}`}>
                          {currentProject.title}
                        </h3>
                        <p className="text-white/60 text-sm md:text-base max-w-2xl leading-relaxed" data-testid={`showcase-desc-${currentProject.id}`}>
                          {currentProject.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {currentProject.tools.map((tool) => (
                            <span
                              key={tool}
                              className="text-[10px] md:text-xs px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 rounded-full"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <motion.div 
                  className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-16 h-16 md:w-24 md:h-24"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500/30">
                    <defs>
                      <path id="circlePath" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                    </defs>
                    <text className="text-[10px] fill-current uppercase tracking-[0.3em]">
                      <textPath href="#circlePath">
                        Click to explore • Click to explore •
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {projects.length > 1 && (
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={prevProject}
                  className="p-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-purple-500 transition-all duration-300"
                  disabled={isTransitioning}
                  data-testid="button-prev-project"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-2">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!isTransitioning) {
                          setIsTransitioning(true);
                          setCurrentIndex(idx);
                          setTimeout(() => setIsTransitioning(false), 600);
                        }
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                          ? 'bg-purple-500 w-8' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      data-testid={`button-slide-${idx}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextProject}
                  className="p-3 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-purple-500 transition-all duration-300"
                  disabled={isTransitioning}
                  data-testid="button-next-project"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}

            {currentProject.link && (
              <motion.div 
                className="flex justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-purple-400 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  data-testid={`link-external-${currentProject.id}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  View on itch.io
                </a>
              </motion.div>
            )}
          </div>
        </div>

        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ 
                clipPath: `circle(0% at ${clickPosition.x}px ${clickPosition.y}px)`,
              }}
              animate={{ 
                clipPath: `circle(150% at ${clickPosition.x}px ${clickPosition.y}px)`,
              }}
              transition={{ 
                duration: 0.9, 
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <motion.img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div className="text-center">
                  <motion.h2
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {selectedProject.title}
                  </motion.h2>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="flex items-center justify-center"
                  >
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
