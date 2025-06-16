"use client"
import React, {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { AgeChartApi } from "@/lib/auth-chart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OldChart = () => {
    const [ageChart, setAgeChart] = useState({ male: [], female: [] });
    useEffect(() => {
        const AgeChart = async () => {
          try {
            const response = await AgeChartApi();
            if (response.status === 'success') {
              setAgeChart(response.data); // Mengakses properti data dari response
            } else {
              console.error('Error fetching Program: status not successful');
            }
          } catch (error) {
            console.error('Error fetching Program:', error);
          }
        };

        AgeChart();
      }, []);
    const options = {
        responsive: true,
        interaction: {
          mode: 'index' as const,
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'User Berdasarkan umur dan jenis kelamin',
          },
        },
        scales: {
          y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
          },
          y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
      
      const labels = ['Usia (13-17)', 'Usia (18-24)', 'Usia (25-40)', 'Usia (41-60)', 'Lanjut Usia 60+'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Laki Laki',
            data: ageChart.male,
            backgroundColor: 'rgb(29 78 216)',
            borderColor: 'rgb(29 78 216)',
            yAxisID: 'y',
          },
          {
            label: 'Perempuan',
            data: ageChart.female,
            backgroundColor: 'rgb(219 234 254)',
            borderColor: 'rgb(219 234 254)',
            yAxisID: 'y1',
          },
        ],
      };
    return <Line style={{ width: "495px", height:"248px" }} width="495" height="248" options={options} data={data}/>
}

export default OldChart