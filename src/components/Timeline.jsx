import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: "2009", title: "The day princess was born", desc: "A special moment starts the journey." },
  { year: "2015", title: "Growing Up", desc: "Memories that shaped the personality." },
  { year: "2022", title: "A New Chapter", desc: "we first met." },
  { year: "2023", title: "Falling in Love you were just 13", desc: "The year everything changed and we fell deeply in love." },
  { year: "Present", title: "Forever & always", desc: "Celebrating you today at your 17th birthday, and looking forward to make more memories in the future." },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Animate the vertical line drawing down
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: true,
        }
      }
    );

    // Animate the items fading in
    const items = gsap.utils.toArray('.timeline-item');
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });

  }, []);

  return (
    <section ref={containerRef} className="py-32 relative bg-dark-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-6 relative">
        
        {/* Center Line */}
        <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
        <div 
          ref={lineRef} 
          className="absolute left-12 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold via-white to-transparent origin-top -translate-x-1/2" 
        />

        <div className="space-y-32">
          {milestones.map((m, i) => (
            <div key={m.year} className={`timeline-item flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Spacer for one side */}
              <div className="hidden md:block md:w-1/2" />
              
              {/* Content */}
              <div className={`pl-24 md:pl-0 w-full md:w-1/2 flex flex-col ${i % 2 === 0 ? 'md:items-start md:pl-16' : 'md:items-end md:pr-16 md:text-right'}`}>
                <div className="text-gold font-bold text-5xl md:text-7xl tracking-tighter mb-2">{m.year}</div>
                <h3 className="text-2xl md:text-3xl font-light text-white mb-2">{m.title}</h3>
                <p className="text-gray-400 text-sm md:text-base max-w-sm">{m.desc}</p>
                
                {/* Connecting Dot */}
                <div className={`absolute left-12 md:left-1/2 w-4 h-4 rounded-full bg-dark-bg border-2 border-gold -translate-x-1/2 mt-6 md:mt-0 ${i % 2 === 0 ? '' : ''}`} />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
