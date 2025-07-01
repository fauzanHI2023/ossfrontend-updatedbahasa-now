'use client';

import {motion} from 'framer-motion';

export default function LoadingOverlay() {
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <motion.div
        className="text-2xl font-semibold"
        initial={{scale: 0.5}}
        animate={{scale: 1}}
        transition={{duration: 0.5}}
      >
        Loading...
      </motion.div>
    </motion.div>
  );
}
