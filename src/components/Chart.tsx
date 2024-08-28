"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables, defaults } from "chart.js";

// 필요한 요소 등록
Chart.register(...registerables);

// defaults.aspectRatio = true;

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
    color1: "#06d6a0",
    color2: "#118ab2",
  },
  {
    title: "Segment 3",
    color1: "#06d6a0",
    color2: "#ffd166",
  },
  {
    title: "Segment 4",
    color1: "#06d6a0",
    color2: "#ef476f",
  },
  {
    title: "Segment 5",
    color1: "#ef476f",
    color2: "#118ab2",
  },
];

function createConicGradient(context, c1, c2) {
  const { dataIndex, chart, dataset } = context;
  const { chartArea, ctx } = chart;

  if (!chartArea || !ctx) {
    return null;
  }

  const countSegments = dataset.data.length;
  const segmentSizeOfDeg = 360 / countSegments;
  const rotation = dataIndex * segmentSizeOfDeg - 90;
  const startAngle = toRadians(rotation);

  const centerX = (chartArea.left + chartArea.right) / 2;
  const centerY = (chartArea.top + chartArea.bottom) / 2;

  const conicGradient = ctx.createConicGradient(startAngle, centerX, centerY);
  conicGradient.addColorStop(0, c1);
  conicGradient.addColorStop(1 / countSegments, c2 ?? c1);
  return conicGradient;
}

const data = segments.map(() => 1);
const labels = segments.map(({ title }) => title);

const getBackgroundColors = (ctx) =>
  segments.map(({ color1, color2 }) =>
    createConicGradient(ctx, color1, color2)
  );

const dataChart = {
  datasets: [
    {
      label: "My First Dataset",
      labels,
      data,
      backgroundColor: getBackgroundColors,
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
            let label = dataset.labels[dataIndex];
            return label;
          },
        },
      },
    },
  },
};

const GradientDoughnut = () => {
  return (
    <div>
      <Doughnut data={dataChart} options={config.options} />
    </div>
  );
};

export default GradientDoughnut;
