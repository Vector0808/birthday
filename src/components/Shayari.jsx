import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Shayari() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const lines = textRef.current.querySelectorAll('.shayari-line');
    
    gsap.fromTo(lines, 
      { y: 30, opacity: 0, filter: 'blur(10px)' },
      {
        y: 0, 
        opacity: 1, 
        filter: 'blur(0px)',
        duration: 2,
        stagger: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-40 px-6 bg-dark-bg min-h-[80vh] flex items-center justify-center relative border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-dark-bg to-dark-bg z-0" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10" ref={textRef}>
        <div className="mb-12">
          <span className="text-gold/50 text-6xl font-serif leading-none opacity-50">❝</span>
        </div>
        
        <div className="space-y-6">
          <p className="shayari-line text-2xl md:text-4xl font-light text-white italic tracking-wide">
            Tere aane se zindagi mein noor aaya hai,
          </p>
          <p className="shayari-line text-2xl md:text-4xl font-light text-white italic tracking-wide">
            Jaise andheron mein ek chand muskuraya hai.
          </p>
          <div className="h-4"></div>
          <p className="shayari-line text-2xl md:text-4xl font-light text-gray-300 italic tracking-wide">
            Har saans mein tera hi naam basa hai,
          </p>
          <p className="shayari-line text-2xl md:text-4xl font-light text-gold italic tracking-wide">
            Mera dil sirf tere hi liye bana hai.
          </p>

          <p className="shayari-line text-2xl md:text-4xl font-light text-gold italic tracking-wide">
            Once again Happy Birthday
          </p>
        </div>
        
        <div className="mt-12">
          <span className="text-gold/50 text-6xl font-serif leading-none opacity-50">❞</span>
        </div>
      </div>
    </section>
  );
}
