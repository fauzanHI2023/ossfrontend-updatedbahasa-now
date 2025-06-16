"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const MapsAbout: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

  const countryStyles = (id: string) => {
    switch (id) {
      case "360": // ID untuk Indonesia
      case "410": // ID untuk Korea Selatan
      case "036": // ID untuk Australia
      case "826": // ID untuk Inggris
      case "840": // ID untuk Amerika Serikat
      case "792": // ID untuk Turki
      case "682": // ID untuk Arab Saudi
      case "276": // ID untuk Jerman
        return "rgb(56 189 248)"; // Biru
      default:
        return "rgb(191 201 139)"; // Abu-abu
    }
  };

  const countryLinks = (id: string) => {
    switch (id) {
      case "360":
        return {
          name: "Human Initaitive Indonesia",
          url: "https://human-initiative.org/",
        };
      case "410":
        return {
          name: "Human Initiative South Korea",
          url: "",
        };
      case "036":
        return {
          name: "Human Initaitive Australia",
          url: "http://www.humaninitiative.org.au/",
        };
      case "826":
        return {
          name: "Human Initaitive United Kingdom",
          url: "https://www.humanaidinitiative.org/",
        };
      case "840":
        return {
          name: "Human Initaitive United States",
          url: "",
        };
      case "792":
        return {
          name: "Human Initaitive Turkey",
          url: "",
        };
      case "682":
        return {
          name: "Human Initaitive Saudi Arabia",
          url: "",
        };
      case "276":
        return {
          name: "Human Initaitive Germany",
          url: "",
        };
      default:
        return {
          name: "",
          url: "",
        };
    }
  };

  const handleMouseEnter = (e: React.MouseEvent, countryInfo: { name: string; url: string }) => {
    if (countryInfo.name) {
      setTooltipContent(
        `<strong>${countryInfo.name}</strong><br/>
        <a href="${countryInfo.url}" target="_blank">${countryInfo.url}</a><br/>`
      );
      setTooltipPosition({ x: e.clientX - 200, y: e.clientY - 100 }); // Adjust the offset here
      setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="relative flex flex-col w-full sm:p-24 p-6">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: [20, -5, 0] }} transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}>
        <div className="relative flex justify-center">
          <ComposableMap className="w-3/4">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  if (geo.id === "010") return null; // Mengabaikan ID 260 (Antartika)

                  const countryInfo = countryLinks(geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => handleMouseEnter(e, countryInfo)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: {
                          fill: countryStyles(geo.id),
                          outline: "none",
                        },
                        hover: {
                          fill: "rgb(3 105 161)",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#0ea5e9",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          {isTooltipVisible && (
            <div
              className="absolute bg-white dark:bg-slate-800 p-4 text-slate-700 dark:text-white rounded-3xl h-[80px]"
              style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={handleMouseLeave}
              dangerouslySetInnerHTML={{ __html: tooltipContent }}
            />
          )}
        </div>
      </motion.h1>
    </div>
  );
};

export default MapsAbout;
