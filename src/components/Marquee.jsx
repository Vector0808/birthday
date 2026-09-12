import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    // Parallax effect on scroll
    gsap.to(text1Ref.current, {
      x: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(text2Ref.current, {
      x: "20%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-dark-bg overflow-hidden flex flex-col gap-4 relative z-10 border-t border-b border-white/5">
      
      <div className="flex whitespace-nowrap will-change-transform" style={{ width: '200vw' }}>
        <h2 ref={text1Ref} className="text-[8vw] font-bold text-transparent tracking-tighter uppercase ml-[10vw]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
          GUDIYA • BETU • WIFEY • PAGLI • GADHI • SHAHZADI •  
        </h2>
      </div>

      <div className="flex whitespace-nowrap will-change-transform justify-end" style={{ width: '200vw', transform: 'translateX(-100vw)' }}>
        <h2 ref={text2Ref} className="text-[8vw] font-bold text-white tracking-tighter uppercase mr-[10vw]">
          MARYAM • JAAN • CUTIE • BACCHA • SARKAR •  
        </h2>
      </div>

    </section>
  );
}
