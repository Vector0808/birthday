import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import AuthScreen from './components/AuthScreen';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Wishes from './components/Wishes';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Shayari from './components/Shayari';
import Dedications from './components/Dedications';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef(null);

  const handleUnlock = () => {
    setIsUnlocked(true);
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(e => console.log("Audio play failed. Ensure a valid audio file exists.", e));
    }

    // Fire cinematic confetti
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#cfa856', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#cfa856', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  useEffect(() => {
    let lenis;
    if (isUnlocked) {
      lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.8,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [isUnlocked]);

  return (
    <div className="bg-dark-bg min-h-screen text-white selection:bg-gold selection:text-black">
      <div className="noise-overlay"></div>
      <CustomCursor />
      
      {/* Background Audio Element */}
      <audio ref={audioRef} src="/song.mp3" />
      
      <AnimatePresence mode="wait">
        {!isUnlocked && (
          <AuthScreen key="auth" onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {isUnlocked && (
        <main>
          <Hero />
          <Marquee />
          <Wishes />
          <Timeline />
          <Shayari />
          <Gallery />
          <Dedications />
          <Footer />
        </main>
      )}
    </div>
  );
}

export default App;
