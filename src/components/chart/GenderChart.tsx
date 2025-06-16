"use client";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { GenderChartApi } from "@/lib/auth-chart";

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = () => {
    const [genderChart, setGenderChart] = useState({ male: 0, female: 0 });
    useEffect(() => {
        const GenderChart = async () => {
          try {
            const response = await GenderChartApi();
            if (response.status === 'success') {
              setGenderChart(response.data); // Mengakses properti data dari response
            } else {
              console.error('Error fetching Program: status not successful');
            }
          } catch (error) {
            console.error('Error fetching Program:', error);
          }
        };

        GenderChart();
      }, []);

  let data = [
    {
      label: "Laki Laki",
      value: genderChart.male,
      color: "rgb(29 78 216)",
      cutout: "90%",
    },
    {
      label: "Perempuan",
      value: genderChart.female,
      color: "rgb(219 234 254)",
      cutout: "90%",
    },
  ];

  const options: any = {
    plugins: {
      datalabels: {
        formatter: function (value: any) {
          let val = Math.round(value);
          return new Intl.NumberFormat("tr-TR").format(val); //for number format
        },
        color: "white",
        font: {
          weight: "bold",
          size: 14,
          family: "poppins",
        },
      },
      title: {
        display: true,
        text: 'User Donor Berdasarkan gender',
      },
      responsive: true,
    },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };
  return <Doughnut data={finalData} options={options} />;
};

export default GenderChart;
