'use client';
import React, {useState, useEffect} from 'react';
import {fetchPublicReports} from '@/lib/publication/auth-public-report';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import PdfViewervb from '@/components/pdf/pdfViewervb';
import {ArrowDownToLine} from 'lucide-react';
import {useTranslations} from 'next-intl';

interface PublicReport {
  id: number;
  title: string;
  cover: string;
  link: string;
  created_at: string;
  type_report: string;
  year_publicreport: string;
  coverUrl?: string;
  linkUrl?: string;
}

const CollectionsPublications = () => {
  const t = useTranslations();
  const [publicReports, setPublicReports] = useState<PublicReport[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [filteredReports, setFilteredReports] = useState<PublicReport[]>([]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const getPublicReports = async () => {
      setLoading(true);
      const data = await fetchPublicReports();
      if (data && data.status === '200') {
        setPublicReports(data.data);
      }
      setLoading(false);
    };
    getPublicReports();
    AOS.init();
  }, []);

  // Filter and process reports when the tab changes or data is fetched
  useEffect(() => {
    const processReports = async () => {
      if (!publicReports) return;

      const sortedReports = [...publicReports]
        .sort((a, b) => b.id - a.id)
        .filter((report) =>
          selectedTab === 'all' ? true : report.type_report === selectedTab
        )
        .slice(0, 5); // Slicing here to limit data

      const updatedReports = await Promise.all(
        sortedReports.map(async (report) => {
          try {
            const coverResponse = await axios.get(
              `/api/getImage?key=${report.cover}`
            );
            const linkResponse = await axios.get(
              `/api/getFile?key=${report.link}`
            );

            return {
              ...report,
              coverUrl: coverResponse.data.url,
              linkUrl: linkResponse.data.url
            };
          } catch (error) {
            console.error(
              `Error fetching URLs for report ${report.id}:`,
              error
            );
            return report;
          }
        })
      );

      setFilteredReports(updatedReports);
    };

    processReports();
  }, [publicReports, selectedTab]);

  return (
    <section
      className={`sm:p-24 p-6 bg flex flex-col w-full gap-y-12 bg-white dark:bg-slate-800`}
    >
      <div className="flex flex-row justify-between items-center">
        <h5
          className={`text-slate-600 dark:text-slate-400 dark:text-white font-semibold sm:text-[36px] text-2xl leading-8 sm:w-3/4 w-full leading-snug`}
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="700"
        >
          {t('SectionSixHome.title')}
        </h5>
      </div>
      <div className="flex flex-row justifygap-x-6 w-full">
        <Tabs
          defaultValue="all"
          onValueChange={(value) => setSelectedTab(value)}
          className="w-full"
        >
          <TabsList className="pb-10 flex flex-row justify-between ">
            <div
              className="flex flex-row"
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="700"
            >
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="annual">Annual Report</TabsTrigger>
              <TabsTrigger value="financial">Financial Report</TabsTrigger>
              <TabsTrigger value="factsheet">Fact Sheet</TabsTrigger>
            </div>
            <Link
              href="#"
              className="text-sky-500 dark:text-sky-700 hover:dark:text-sky-500 py-3 px-3 rounded-lg w-[100px] h-[42px] hover:w-[160px] hover:dark:border-sky-500 overflow-hidden relative transition duration-700 ease-in"
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="700"
            >
              See other{' '}
              <span className="transition duration-600 ease-in">Report</span>
            </Link>
          </TabsList>
          <TabsContent
            value={selectedTab}
            className="flex flex-col gap-y-8 justify-center items-center w-full"
          >
            <div className="sm:grid sm:grid-cols-5 sm:gap-10 w-full flex flex-col gap-y-6">
              {loading ? (
                <p>Loading...</p>
              ) : filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="publikasi-card mb-4 border-b w-full flex flex-col gap-x-3 justify-start bg-gray-50 dark:bg-slate-800 transition duration-500 ease-in hover:bg-gray-100"
                  >
                    {report.coverUrl ? (
                      <span className="w-[230px] h-[300px] overflow-hidden relative">
                        <Image
                          src={report.coverUrl}
                          alt={report.title}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover float-none absolute origin-bottom -rotate-12 left-6"
                        />
                      </span>
                    ) : (
                      <p>No img image available.</p>
                    )}
                    <div className="flex flex-col justify-start items-start w-full px-4 py-4 gap-y-4">
                      <h2 className="capitalize text-base leading-6 font-medium text-slate-950 dark:text-white leading-6 h-full overflow-hidden">
                        {report.title}
                      </h2>
                      <div className="flex sm:flex-row flex-col gap-x-4">
                        {report.linkUrl ? (
                          <a
                            href={report.linkUrl}
                            target="_blank"
                            className="hidden text-sky-500 hover:underline mt-2 flex flex-row justify-center items-center"
                          >
                            Download Report
                            <ArrowDownToLine className="text-sky-600 hover:animate-shake" />
                          </a>
                        ) : (
                          <p>No report file available.</p>
                        )}
                        {report.linkUrl ? (
                          <PdfViewervb fileUrl={report.linkUrl} />
                        ) : (
                          <p>No report file available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reports available.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CollectionsPublications;
