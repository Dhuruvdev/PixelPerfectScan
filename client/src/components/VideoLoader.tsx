import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { SkipForward } from 'lucide-react';
import videoSource from '@assets/0ee901572ebe4fd3a9f47974987ea76e_1764842795749.mp4';

interface VideoLoaderProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { name: "ABOUT", href: "#about" },
  { name: "WORK", href: "#work" },
  { name: "CONTACT", href: "#contact" },
];

function IntroNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] flex items-start justify-between px-6 py-6 bg-transparent">
      <div className="text-xl font-bold tracking-tighter font-sans text-white mix-blend-difference pointer-events-auto cursor-pointer">
        dhuruv.dev
      </div>
      
      <nav className="flex flex-col items-end gap-2 text-right pointer-events-auto">
        {NAV_LINKS.map((link) => (
          <span 
            key={link.name}
            className="text-xs md:text-sm font-mono uppercase tracking-widest text-white/80 mix-blend-difference cursor-default"
          >
            {link.name}
          </span>
        ))}
      </nav>
    </header>
  );
}

export function VideoLoader({ children }: VideoLoaderProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    const playVideo = async () => {
      try {
        await video.play();
        setTimeout(() => setShowSkipButton(true), 2000);
      } catch (error) {
        console.error('Video autoplay failed:', error);
        setVideoError(true);
        setTimeout(handleVideoEnd, 1500);
      }
    };

    if (video.readyState >= 3) {
      setVideoLoaded(true);
      playVideo();
    } else {
      video.addEventListener('canplay', () => playVideo(), { once: true });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      if (video) {
        video.pause();
      }
    };
  }, []);

  const handleVideoEnd = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setVideoEnded(true);
    }, 500);
  };

  const handleSkip = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    handleVideoEnd();
  };

  if (videoEnded) {
    return <>{children}</>;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 500ms ease-out',
      }}
    >
      <IntroNavbar />

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        preload="auto"
        onEnded={handleVideoEnd}
        onError={() => {
          console.error('Video loading error');
          setVideoError(true);
          setTimeout(handleVideoEnd, 1500);
        }}
        data-testid="video-loader"
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      {showSkipButton && !isTransitioning && (
        <div className="absolute bottom-8 right-8 z-[60]">
          <Button
            onClick={handleSkip}
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
            data-testid="button-skip-video"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip Intro
          </Button>
        </div>
      )}

      {videoError && !videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-[55]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-white/70 text-sm font-mono uppercase tracking-widest">Loading...</p>
          </div>
        </div>
      )}

      <div className="hidden">
        {children}
      </div>
    </div>
  );
}
