'use client';

import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import clsx from 'clsx';

const cards = Array.from({length: 10}, (_, i) => `Card ${i + 1}`);

export default function ScrollingCards() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const tl1 = useRef<gsap.core.Tween>();
  const tl2 = useRef<gsap.core.Tween>();

  useEffect(() => {
    if (row1Ref.current && row2Ref.current) {
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;

      const totalWidth = row1.scrollWidth / 3;

      tl1.current = gsap.to(row1, {
        x: -totalWidth,
        duration: 60,
        ease: 'linear',
        repeat: -1
      });

      tl2.current = gsap.to(row2, {
        x: totalWidth,
        duration: 60,
        ease: 'linear',
        repeat: -1
      });
    }
  }, []);

  const handleMouseEnter = () => {
    tl1.current?.pause();
    tl2.current?.pause();
  };

  const handleMouseLeave = () => {
    tl1.current?.resume();
    tl2.current?.resume();
  };

  const renderRow = (reverse = false) => (
    <div
      ref={reverse ? row2Ref : row1Ref}
      className={clsx('flex w-max', reverse && 'flex-row-reverse')}
    >
      {[...cards, ...cards].map((card, index) => (
        <div
          key={`${card}-${index}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="bg-white text-slate-700 p-4 m-2 rounded-lg min-w-[300px] text-center cursor-pointer hover:bg-sky-50 transition-colors"
        >
          {card}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 overflow-hidden py-10 bg-slate-50">
      <div className="overflow-hidden">{renderRow(false)}</div>
      <div className="overflow-hidden">{renderRow(true)}</div>
    </div>
  );
}
