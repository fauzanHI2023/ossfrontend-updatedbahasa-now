'use client';

import {useState} from 'react';
import {motion} from 'framer-motion';
import HashLoader from 'react-spinners/HashLoader';

export default function LoadingOverlay() {
  const [color, _setColor] = useState('#209ce2');
  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <motion.div
        className="text-2xl font-semibold flex flex-col justify-center items-center"
        initial={{scale: 0.5}}
        animate={{scale: 1}}
        transition={{duration: 0.5}}
      >
        <HashLoader color={color} loading={true} size={50} />
        Loading Authentikasi
        <span>Login </span>
      </motion.div>
    </motion.div>
  );
}
