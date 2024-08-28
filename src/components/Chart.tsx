"use client";
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

const segments = [
  {
    title: "Segment 1",
    color1: "#06d6a0",
    color2: "#ef476f",
  },
  {
    title: "Segment 2",
    color1: "#118ab2",
  },
  {
    title: "Segment 3",
    color1: "#06d6a0",
    color2: "#ffd166",
  },
  {
    title: "Segment 4",
    color1: "#06d6a0",
    color2: null,
  },
  {
    title: "Segment 5",
    color1: "#ef476f",
    color2: null,
  },
];

function createConicGradient(ctx, c1, c2, startAngle) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const conicGradient = ctx.createConicGradient(startAngle, centerX, centerY);
  conicGradient.addColorStop(0, c1);
  conicGradient.addColorStop(1, c2 ?? c1);
  return conicGradient;
}

const DoughnutChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const data = segments.map(() => 1);
    const labels = segments.map(({ title }) => title);

    const getBackgroundColors = () =>
      segments.map(({ color1, color2 }, index) => {
        const segmentSizeOfDeg = 360 / segments.length;
        const startAngle = toRadians(index * segmentSizeOfDeg - 90);
        return createConicGradient(ctx, color1, color2, startAngle);
      });

    const dataChart = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: data,
          backgroundColor: getBackgroundColors(),
          hoverOffset: 10,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: dataChart,
      options: {
        responsive: true,
        animation: false,
        plugins: {
          tooltip: {
            yAlign: "bottom",
            displayColors: false,
            callbacks: {
              label: function (context) {
                const { dataIndex, dataset } = context;
                return dataset.labels[dataIndex];
              },
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default DoughnutChart;
