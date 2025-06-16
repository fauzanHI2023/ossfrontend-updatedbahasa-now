'use client';

import React, {useState, useEffect} from 'react';
import {Progress} from '@/components/ui/progress_fe';
import {fetchCampaign} from '@/lib/donation/campaign/auth-campaign';
import {Heart} from 'lucide-react';
import Link from 'next/link';
import AnimationCardPulse from '../../animation-card-pulse';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useTranslations} from 'next-intl';

const FundProject = () => {
  const t = useTranslations();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setIsLoading(true);
        const campaigns = await fetchCampaign();
        setProjects(campaigns.data || []); // Pastikan campaigns adalah array
      } catch (error) {
        console.error(`Error fetching URLs for report`, error);
        setError('Failed to load campaigns');
      } finally {
        setIsLoading(false);
      }
    };

    getProjects();
    AOS.init();
  }, []);

  const calculateProgress = (grossAmount: number): number => {
    const min = 50000;
    const max = 100000000;
    return ((grossAmount - min) / (max - min)) * 100;
  };

  if (error) {
    return (
      <div className="p-24 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-24 text-center">
        <p>No campaigns found.</p>
      </div>
    );
  }

  const formatCurrency = (value: string) => {
    const parsedValue = parseInt(value || '0');
    return `Rp ${parsedValue.toLocaleString('id-ID')}`;
  };

  const stripHtml = (html: string) => {
    if (typeof window !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }
    return html;
  };

  const truncateAndStripHtml = (html: string, wordLimit: number) => {
    const plainText = stripHtml(html);
    const words = plainText.split(' ');
    return (
      words.slice(0, wordLimit).join(' ') +
      (words.length > wordLimit ? '...' : '')
    );
  };

  return (
    <section className="sm:px-24 py-12 p-6 flex flex-col sm:gap-y-4 gap-y-2 w-full dark:bg-slate-950 bg-[#f6fcff]">
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col gap-y-4">
          <h5
            className="text-slate-700 dark:text-white font-semibold sm:text-[36px] text-2xl leading-8"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="500"
          >
            {t('SectionFiveHome.title')}
          </h5>
          <p
            className="text-slate-500 dark:text-slate-500 font-medium text-sm"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            {t('SectionFiveHome.desc')}
          </p>
        </div>
        <Link
          href="/takeaction/donate"
          className="text-sky-500 dark:text-sky-700 hover:dark:text-sky-500 py-3 px-3 rounded-lg w-[100px] h-[42px] hover:w-[200px] hover:dark:border-sky-500 overflow-hidden relative transition duration-700 ease-in"
          data-aos="fade-left"
          data-aos-easing="linear"
          data-aos-duration="700"
        >
          See other{' '}
          <span className="transition duration-600 ease-in">Campaign</span>​
        </Link>
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-x-8 flex-wrap">
        {projects.slice(0, 4).map((projectItem: any) => (
          <div
            key={projectItem.id}
            className="h-full flex flex-col justify-between rounded-2xl"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <Link href={`/campaign/${projectItem.slug}`}>
              <div className="publikasi-card flex flex-col gap-y-4 h-[200px] pt-4">
                <Image
                  src={`https://cdnx.human-initiative.org/image/${projectItem.campaign_img}`}
                  alt={projectItem.campaign_name}
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              </div>
            </Link>
            <div className="flex flex-col py-4 hover:shadow-lg hover:rounded-xl transition duration-200 ease-in px-6 dark:bg-slate-900 bg-white">
              <div className="flex flex-col gap-y-4">
                <span className="flex text-sky-500 text-sm dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">
                  {projectItem.core_program}
                </span>
                <Link href={`/campaign/${projectItem.slug}`}>
                  <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">
                    {projectItem.campaign_name}
                  </h6>
                </Link>
                <h6 className="hidden text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">
                  {truncateAndStripHtml(projectItem.campaign_description, 5)}
                </h6>
                <Progress
                  value={calculateProgress(projectItem.donation_collected || 0)}
                />
              </div>
              <p className="text-sky-700 text-xs dark:text-white text-center flex flex-row gap-x-2 py-4">
                <span>
                  <Heart className="text-red-500 w-4 h-4" />
                </span>
                {projectItem.support} people give support
              </p>
              <div className="flex flex-row gap-x-8">
                <div className="w-2/3 flex flex-col justify-center items-start">
                  <h6 className="text-slate-950 dark:text-sky-500 text-lg font-bold">
                    {formatCurrency(projectItem.donation_collected)}
                  </h6>
                  {/* <h6 className="text-slate-500 dark:text-slate-200 text-sm">{formatCurrency(projectItem.target_donation)}</h6> */}
                </div>
                <Link
                  href={`/campaign/${projectItem.slug}`}
                  className="flex justify-center w-1/3 bg-sky-700 hover:bg-sky-600 transition duration-200 ease-in text-white dark:text-white py-3 px-4 rounded-xl"
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FundProject;
