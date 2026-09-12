import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Wishes() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const lines = textRef.current.querySelectorAll('.reveal-text');
    
    gsap.fromTo(lines, 
      { y: 50, opacity: 0, rotateX: -90 },
      {
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 70%",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 bg-dark-bg min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto text-center" ref={textRef}>
        <div style={{ perspective: "1000px" }} className="mb-4">
          <p className="reveal-text text-3xl md:text-5xl lg:text-6xl font-light text-gray-300 leading-tight origin-bottom">
            Wishing you a day filled with
          </p>
        </div>
        <div style={{ perspective: "1000px" }} className="mb-4">
          <p className="reveal-text text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight origin-bottom">
            unforgettable moments,
          </p>
        </div>
        <div style={{ perspective: "1000px" }} className="mb-4">
          <p className="reveal-text text-3xl md:text-5xl lg:text-6xl font-light text-gray-300 leading-tight origin-bottom">
            endless joy, and
          </p>
        </div>
        <div style={{ perspective: "1000px" }}>
          <p className="reveal-text text-3xl md:text-5xl lg:text-6xl font-light text-gold italic leading-tight origin-bottom">
            cinematic magic.
            <br />happy birthday meri jaan
          </p>
        </div>
      </div>
    </section>
  );
}
