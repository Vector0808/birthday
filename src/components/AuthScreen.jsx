import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AuthScreen({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'sarkar2009') {
      setError(false);
      setUnlocked(true);
      setTimeout(() => onUnlock(), 1200);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 1.5 } }}
    >
      {/* Background curtains that split on unlock */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1/2 bg-dark-bg z-10"
        initial={{ y: 0 }}
        animate={unlocked ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1/2 bg-dark-bg z-10"
        initial={{ y: 0 }}
        animate={unlocked ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      />
      
      {/* The center line */}
      <motion.div 
        className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 z-20"
        initial={{ scaleX: 1, opacity: 1 }}
        animate={unlocked ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <motion.form 
        onSubmit={handleSubmit}
        className="z-30 flex flex-col items-center gap-12 mix-blend-difference"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: unlocked ? 0 : 1, scale: unlocked ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center overflow-hidden">
          <motion.h1 
            className="text-[3rem] md:text-[6rem] font-bold tracking-tighter uppercase leading-none"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            Access
          </motion.h1>
          <motion.p 
            className="text-sm tracking-[0.5em] text-gray-500 uppercase mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Enter Credentials
          </motion.p>
        </div>

        <motion.div 
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative w-64 md:w-80"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="[ PASSWORD ]"
            className={`w-full bg-transparent border-b ${error ? 'border-red-500 text-red-500' : 'border-white/30 text-white'} px-2 py-4 text-center placeholder-white/30 focus:outline-none focus:border-white transition-colors tracking-[0.3em] uppercase`}
            autoFocus
          />
          <button type="submit" className="hidden">Submit</button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
