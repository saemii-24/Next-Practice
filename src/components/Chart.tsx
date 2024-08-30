"use client";
import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, ScriptableContext } from "chart.js";
import { Chart, defaults } from "chart.js/auto";

Chart.register(ArcElement, Tooltip, Legend);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const DoughnutChart = () => {
  const chartRef = useRef<Chart<"doughnut">>(null);
  const [isRendered, setIsRendered] = useState(false);

  // 데이터와 라벨을 컴포넌트 내에서 직접 정의
  const chartData = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    data: [10, 20, 30, 40, 50],
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "My Dataset",
        data: chartData.data,
        backgroundColor: (context: ScriptableContext<"doughnut">) => {
          const ctx = context.chart.ctx;
          // const chart = context.chart;
          // const { width, height } = chart;
          const centerX = 80;
          const centerY = 80;

          const meta = context.chart.getDatasetMeta(0);
          const element: any = meta.data[context.dataIndex];

          const startAngle = element.startAngle || 0;
          const endAngle = element.endAngle || Math.PI * 2;

          console.log(element + " " + startAngle + " " + endAngle);

          const gradientStartX = centerX + centerX * Math.cos(startAngle);
          const gradientStartY = centerY + centerY * Math.sin(startAngle);
          const gradientEndX = centerX + centerX * Math.cos(endAngle);
          const gradientEndY = centerY + centerY * Math.sin(endAngle);

          const gradient = ctx.createLinearGradient(
            gradientStartX,
            gradientStartY,
            gradientEndX,
            gradientEndY
          );

          const colors = [
            ["rgb(24, 222, 198)", "rgba(24, 222, 198, 0.25)"],
            ["rgb(47, 133, 250)", "rgba(47, 133, 250, 0.25)"],
            ["rgb(255, 97, 63)", "rgba(255, 97, 63, 0.25)"],
            ["rgb(48, 209, 255)", "rgba(48, 209, 255, 0.25)"],
            ["rgb(97, 93, 255)", "rgba(97, 93, 255, 0.25)"],
          ];

          const colorPair = colors[context.dataIndex % colors.length];
          gradient.addColorStop(0, colorPair[0]);
          gradient.addColorStop(1, colorPair[1]);

          return gradient;
        },
        borderColor: "#ffffff",
        borderWidth: 4,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    cutout: "60%",
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        usePointStyle: true,
        borderWidth: 0,
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}건`;
          },
        },
      },
    },
  };

  return (
    <div className="flex w-full items-center gap-[52px] rounded-2xl px-12 py-8">
      <div className="size-40">
        <Doughnut ref={chartRef} data={data} options={options} />
      </div>
      <ul className="block w-full ">
        {chartData.data.map((item: any, index: number) => (
          <li key={item} className="flex w-full items-center font-medium">
            <div className="flex items-center text-center text-sm font-regular text-black">
              <div className="mr-5 size-[10px] rounded-sm"></div>
              <div>{chartData.labels[index]}</div>
            </div>
            <div className="ml-4">{chartData.data[index]}건</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoughnutChart;
