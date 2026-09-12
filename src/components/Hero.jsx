import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Split text into spans for letter animation
    const splitText = (ref) => {
      const text = ref.current.innerText;
      ref.current.innerHTML = text.split('').map(char => 
        `<span class="inline-block" style="transform: translateY(110%);">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      return ref.current.querySelectorAll('span');
    };

    const chars1 = splitText(text1Ref);
    const chars2 = splitText(text2Ref);

    tl.to([...chars1, ...chars2], {
      y: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: "power4.out",
      delay: 1.5 // Wait for auth split animation
    });

  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-dark-bg"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-dark-bg to-dark-bg z-0" />
      
      <div className="z-10 flex flex-col w-full px-4 md:px-[10vw] uppercase leading-[0.8] tracking-tighter">
        <div className="overflow-hidden pb-4">
          <h1 ref={text1Ref} className="text-[20vw] md:text-[15vw] font-bold text-white whitespace-nowrap">
            Maryam
          </h1>
        </div>
        <div className="overflow-hidden flex justify-end mt-[-4vw] md:mt-[-2vw] pb-4">
          <h1 ref={text2Ref} className="text-[20vw] md:text-[15vw] font-bold text-gold whitespace-nowrap">
            Ghulam
          </h1>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-12 z-10 hidden md:block">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Scroll to discover</p>
        <div className="w-[1px] h-12 bg-white/20" />
      </div>
    </section>
  );
}
