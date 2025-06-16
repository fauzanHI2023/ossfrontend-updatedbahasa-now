import React from 'react';

interface BannerProps {
  title: string;
  description: string;
  image: string;
}

const Banner: React.FC<BannerProps> = ({title, description, image}) => {
  return (
    <section className="flex flex-col sm:pt-0 pt-0 sm:px-6 px-6 dark:bg-slate-950 bg-white sm:h-[600px] relative z-20">
      <div
        className="flex flex-col gap-y-6 justify-center items-center m-6 py-16 px-8 no-repeat rounded-3xl h-full bg-cover bg-no-repeat bg-center"
        style={{backgroundImage: `url(${image})`}}
      >
        <h4 className="text-sky-600 text-6xl font-semibold bg-white dark:bg-slate-700">
          {title}
        </h4>
        <h5 className="text-sky-600 text-lg font-medium bg-white dark:bg-slate-700">
          {description}
        </h5>
      </div>
    </section>
  );
};

export default Banner;
