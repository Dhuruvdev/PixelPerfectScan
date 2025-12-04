import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { SkipForward } from 'lucide-react';
import videoSource from '@assets/0ee901572ebe4fd3a9f47974987ea76e_1764842795749.mp4';

interface VideoLoaderProps {
  children: React.ReactNode;
}

export function VideoLoader({ children }: VideoLoaderProps) {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
        setTimeout(() => setShowSkipButton(true), 2000);
      } catch (error) {
        console.error('Video autoplay failed:', error);
        setVideoError(true);
        setTimeout(handleVideoEnd, 1000);
      }
    };

    playVideo();

    return () => {
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
          setTimeout(handleVideoEnd, 1000);
        }}
        data-testid="video-loader"
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      {showSkipButton && !isTransitioning && (
        <div className="absolute bottom-8 right-8">
          <Button
            onClick={handleSkip}
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            data-testid="button-skip-video"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip Intro
          </Button>
        </div>
      )}

      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-lg">Loading website...</p>
        </div>
      )}

      <div className="hidden">
        {children}
      </div>
    </div>
  );
}
