import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const placeholders = [
  { id: 1, type: 'photo', src: '/1.jpeg' },
  { id: 2, type: 'photo', src: '/2.jpeg' },
  { id: 3, type: 'photo', src: '/3.jpeg' },
  { id: 4, type: 'photo', src: '/4.jpeg' },
  { id: 5, type: 'video', src: '/v1.mp4' },
];

export default function Gallery() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // We need to wait for layout, Lenis might affect this so a small timeout helps
    const ctx = gsap.context(() => {
      gsap.to(wrapperRef.current, {
        x: () => -(wrapperRef.current.scrollWidth - window.innerWidth) + "px",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + wrapperRef.current.scrollWidth,
          invalidateOnRefresh: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-dark-bg overflow-hidden flex items-center">
      <div className="absolute top-12 left-12 z-10 mix-blend-difference">
        <h2 className="text-xl md:text-2xl font-light text-white uppercase tracking-widest">
          Memories
        </h2>
      </div>

      <div ref={wrapperRef} className="flex gap-12 md:gap-24 px-[10vw] h-[60vh] md:h-[70vh] items-center will-change-transform">
        {placeholders.map((item, index) => (
          <div 
            key={item.id} 
            className={`gallery-item relative shrink-0 overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center
              ${index % 2 === 0 ? 'w-[70vw] md:w-[35vw] h-[90%]' : 'w-[50vw] md:w-[25vw] h-[70%]'}
            `}
          >
            <div className="media-wrapper absolute inset-0 w-full h-full z-0 p-2 md:p-4">
               {item.type === 'video' ? (
                 <video src={item.src} autoPlay loop playsInline className="w-full h-full object-contain" />
               ) : (
                 <img src={item.src} alt={`Memory ${item.id}`} className="w-full h-full object-contain" />
               )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
