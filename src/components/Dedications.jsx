import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const messages = [
  { id: 1, text: "You bring so much light into the world. Keep shining.", author: "Ghulam" },
  { id: 2, text: "Wishing you a blessed year ahead, full of plot twists that make you smile.", author: "Veer" },
  { id: 3, text: "To the most brilliant and unstoppable person I know. Happy Birthday!", author: "Loved One" },
];

export default function Dedications() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.dedication-card');
    
    cards.forEach((card, index) => {
      gsap.fromTo(card, 
        { y: 150, opacity: 0, rotateX: 45, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-dark-bg min-h-screen flex flex-col items-center justify-center" style={{ perspective: "2000px" }}>
      <h2 className="text-3xl md:text-5xl font-light text-white mb-24 uppercase tracking-widest text-center">
        Words of Love
      </h2>

      <div className="flex flex-col gap-12 md:gap-24 w-full max-w-4xl">
        {messages.map((msg, idx) => (
          <div 
            key={msg.id} 
            className={`dedication-card p-8 md:p-12 bg-dark-surface border border-white/10 rounded-sm relative transform-gpu shadow-2xl ${idx % 2 === 0 ? 'ml-0 md:mr-auto' : 'mr-0 md:ml-auto'} w-full md:w-[80%]`}
          >
            <span className="text-6xl text-gold/20 absolute top-4 left-4 font-serif leading-none">"</span>
            <p className="text-xl md:text-3xl font-light text-gray-200 leading-relaxed relative z-10 pl-4 md:pl-8">
              {msg.text}
            </p>
            <div className="mt-8 pl-4 md:pl-8 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-gold" />
              <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">{msg.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
