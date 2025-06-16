"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchVacancy } from "@/lib/vacancies/auth-vacancy";
import Link from "next/link";
import { Briefcase, CalendarDays, MapPin, CheckCheck } from 'lucide-react';

interface Vacancy {
  id: number;
  vacancy_name: string;
  job_description: string;
  requirement: string;
  location: string;
  type_vacancy: string;
  due_date: string;
  slug: string;
}

const VacancyDetail = () => {
  const params = useParams();
  const slug = params?.slug;

  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      console.warn("Missing slug in URL");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      console.log("Fetching vacancy with slug:", slug); // Debugging log
      setLoading(true);
      setError(null);

      try {
        const data = await fetchVacancy();
        console.log("API Response:", data); // Debugging log

        if (data?.status === "200") {
          const foundVacancy = data.data.find((v: Vacancy) => v.slug === slug);
          if (foundVacancy) {
            setVacancy(foundVacancy);
          } else {
            console.warn("Vacancy not found for slug:", slug);
            setVacancy(null);
          }
        } else {
          console.error("API returned invalid status:", data.status);
          setError("Failed to fetch data. Invalid response status.");
        }
      } catch (err: any) {
        console.error("Error fetching vacancy:", err);
        setError(err.message || "Failed to fetch vacancy details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!vacancy) return <p>Vacancy not found.</p>;

  const processContent = (html: string) => {
    let processedHtml = html.replace(/(\r\n|\r|\n)+/g, "<br>"); // Replace all line breaks with <br>
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      `<div style="text-align: center;"><img$1 style="margin: 1rem auto; max-width: 100%; height: auto;" /></div>`
    ); // Center <img> tags
    return processedHtml;
  };

  return (
    <main className="bg-gray-50 flex flex-col text-center justify-center items-center sm:pb-28 sm:pt-0 py-12 w-full">
      <header className="w-full bg-white bg-hero-career-details center sm:h-[400px] h-[600px] sm:mb-16 mb-8 flex flex-col sm:px-28 px-6 justify-center items-start">
        <h1 className="font-bold text-white sm:text-3xl text-xl sm:pb-8 pb-4">
          {vacancy.vacancy_name}
        </h1>
        <p className="flex flex-row gap-x-3 font-normal text-white text-sm font-base">
          <MapPin/> {vacancy.location}
        </p>
      </header>
      <div className="w-[1200px] flex sm:flex-row flex-col sm:gap-y-8 justify-between">
        <div className="sm:w-3/5 w-full text-gray-600 dark:text-gray-200 flex flex-col justify-center items-start gap-x-4">
          <div className="flex flex-row gap-x-8 pb-10">
            <p className="flex flex-row gap-x-2">
              <Briefcase className="text-sky-700"/> {vacancy.type_vacancy}
            </p>
            <p className="flex flex-row gap-x-2">
              <CalendarDays className="text-sky-700"/> {vacancy.due_date}
            </p>
          </div>
          <h2 className="text-slate-800 font-semibold text-lg">Job Description</h2>
          <p
            className="text-start text-slate-600"
            dangerouslySetInnerHTML={{
              __html: processContent(vacancy.job_description),
            }}
          />
          <h2 className="text-slate-800 font-semibold text-lg">Requirements</h2>
          <p
            className="text-start text-slate-600"
            dangerouslySetInnerHTML={{
              __html: processContent(vacancy.requirement),
            }}
          />
        </div>
        <div className="sm:w-2/5 w-full flex flex-col gap-y-4 border-l border-gray-300 sm:pl-40 px-4">
          <Link
            href={`applywork`}
            className="bg-sky-600 text-white rounded-full px-4 py-3 flex flex-row gap-x-4"
          >
            Apply Now <CheckCheck/>
          </Link>
          <div className="flex flex-row">
            <h5>Share work</h5>
          </div>
          <h5 className="text-justify italic text-gray-600 text-base font-light">
            Human Initiative is a global humanitarian organization that continues to strive to provide more meaningful benefits with multi-stakeholder support.
          </h5>
        </div>
      </div>
      <div className="hidden"></div>
    </main>
  );
};

export default VacancyDetail;
