'use client';

import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import {collaborateSponsor} from '@/data/data';
import Image from 'next/image';

export default function ScrollingCards() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const tl1 = useRef<gsap.core.Tween>();
  const tl2 = useRef<gsap.core.Tween>();

  // Bagi dua data sponsor
  const sponsors1 = collaborateSponsor.slice(0, 10);
  const sponsors2 = collaborateSponsor.slice(10, 20);

  useEffect(() => {
    if (row1Ref.current && row2Ref.current) {
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;

      const totalWidth = row1.scrollWidth / 2;

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

  const renderRow = (data: typeof collaborateSponsor, reverse = false) => (
    <div
      ref={reverse ? row2Ref : row1Ref}
      className={clsx('flex w-full relative', reverse && 'flex-row-reverse')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {[...data, ...data].map((card, index) => (
        <div
          key={`${card.id}-${index}`}
          className="bg-white text-slate-700 p-4 m-2 rounded-lg min-w-[200px] max-w-[200px] text-center cursor-pointer hover:bg-sky-50 transition-colors"
        >
          <div className="relative w-full h-[32] mb-2">
            <Image
              src={card.img}
              alt={card.title}
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm font-medium">{card.title}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full space-y-6 overflow-hidden py-10 bg-slate-50">
      <div className="overflow-hidden">{renderRow(sponsors1, false)}</div>
      <div className="overflow-hidden">{renderRow(sponsors2, true)}</div>
    </div>
  );
}
