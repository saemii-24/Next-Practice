"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

// 필요한 요소 등록
Chart.register(...registerables);

function getSegmentAngle(index, totalSegments, rotation) {
  const segmentSizeOfDeg = 360 / totalSegments;
  return rotation + index * segmentSizeOfDeg;
}

function createLinearGradient(ctx, x0, y0, x1, y1, c1, c2) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, c1);
  gradient.addColorStop(1, c2);
  return gradient;
}

const segments = [
  { title: "Segment 1", color1: "#06d6a0", color2: "#ef476f" },
  { title: "Segment 2", color1: "#06d6a0", color2: "#118ab2" },
  { title: "Segment 3", color1: "#06d6a0", color2: "#ffd166" },
  { title: "Segment 4", color1: "#06d6a0", color2: "#ef476f" },
  { title: "Segment 5", color1: "#ef476f", color2: "#118ab2" },
];

const initialData = [1, 2, 3, 4, 5];
const labels = segments.map(({ title }) => title);

const GradientDoughnut = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // 데이터 변경 예시
    setData([2, 3, 4, 5, 6]);
  }, []);

  const dataChart = {
    datasets: [
      {
        label: "My First Dataset",
        labels,
        data,
        backgroundColor: (context) => {
          const { chart, dataIndex } = context;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const totalSegments = data.length;
          const startAngle = getSegmentAngle(
            dataIndex,
            totalSegments,
            chart.options.rotation
          );

          // 중심점 좌표
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;
          const radius = (chartArea.right - chartArea.left) / 2;

          // 시작점과 끝점 좌표 계산
          const startX = centerX + radius * Math.cos(toRadians(startAngle));
          const startY = centerY + radius * Math.sin(toRadians(startAngle));
          const endX =
            centerX +
            radius * Math.cos(toRadians(startAngle + 360 / totalSegments));
          const endY =
            centerY +
            radius * Math.sin(toRadians(startAngle + 360 / totalSegments));

          const { color1, color2 } = segments[dataIndex];

          return createLinearGradient(
            ctx,
            startX,
            startY,
            endX,
            endY,
            color1,
            color2
          );
        },
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div>
      <Doughnut
        data={dataChart}
        options={{
          responsive: true,
          animation: false,
          rotation: -90, // 시작 각도 설정
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
        }}
      />
    </div>
  );
};

export default GradientDoughnut;

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
