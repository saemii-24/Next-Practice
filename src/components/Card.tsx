"use client";
import React, { useState } from "react";
import Image from "next/image";

const Card = () => {
  const [start, setStart] = useState<boolean>(false);
  const handleStarClick: React.MouseEventHandler<SVGSVGElement> = () => {
    setStart(!start);
  };

  return (
    <div className="w-[320px] h-[150px] p-5 shadow-[0_0_10px_0_rgba(250,204,21,0.3),0_0_10px_0_rgba(236,72,153,0.3)] rounded-lg">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center text-xs">
            <Ball />
            <div className="ml-2">no.</div>
            <div>001</div>
          </div>
          <Star start={start} onClick={handleStarClick} />
        </div>
      </div>

      <div className="flex w-full justify-between">
        <div>
          <button
            type="button"
            className="mt-2 bg-yellow-300 px-2 py-[0.1rem] rounded-md text-xs font-bold"
          >
            전기
          </button>
          <div className="mt-4 text-xl font-bold">피카츄</div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="https://i.namu.wiki/i/eeva6fYyC8T1c1s6NOmsDAKnii5HtTEI-zS2pMgIc-LL-EXjpRsGHzjFNx2uMBMmmK_HYDYhBaiUeLjPQD2nzA.webp"
            width={80}
            height={80}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
};

export const Ball = () => {
  return (
    <svg
      id="Layer_1"
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="auto"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <g>
        <g>
          <path
            fill={"url(#gradient)"}
            d="M37.1,57.7c2.6,4.5,7.5,7.4,12.9,7.4c5.4,0,10.2-2.9,12.9-7.4c13.9,0.3,21.9,1,26,1.6C84.7,77.1,68.7,90.1,50,90.1    c-18.7,0-34.7-12.9-38.9-30.7C15.2,58.7,23.2,58,37.1,57.7 M40.3,52.6c-17.2,0.3-32.5,1.3-35,3.1C8.2,77.9,27.1,95.1,50,95.1    c22.9,0,41.8-17.1,44.6-39.3c-2.5-1.8-17.7-2.8-35-3.1c-1.1,4.3-5,7.4-9.7,7.4C45.4,60.1,41.5,56.9,40.3,52.6L40.3,52.6z"
          />
        </g>
        <path
          fill={"url(#gradient)"}
          d="M50,4.9c-24.9,0-45,20.1-45,45c0,0.4,0,0.7,0,1.1c0.2-0.7,2-1.2,5-1.7C10.3,28.4,26.7,10.5,47.3,9c1.4-0.1,2.7,1.1,2.7,2.5   v0c0,1.3-1,2.4-2.3,2.5C29.5,15.2,15.1,30.3,15,48.7c6.5-0.6,15.6-1,25.3-1.2c1.1-4.4,5-7.6,9.7-7.6c4.7,0,8.6,3.2,9.7,7.6   C78.2,47.8,94.5,49,95,51.1c0-0.4,0-0.7,0-1.1C95,25.1,74.9,4.9,50,4.9z"
        />
      </g>
    </svg>
  );
};

export const Star = ({
  start = false,
  onClick,
}: {
  start: boolean;
  onClick: React.MouseEventHandler<SVGSVGElement>;
}) => {
  return (
    <svg
      id="Icons"
      viewBox="0 0 24 24"
      width="15"
      onClick={onClick}
      className="cursor-pointer"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path
        d="M12.992,20.912l3.5,1.838A2.131,2.131,0,0,0,19.58,20.5l-.667-3.893a2.129,2.129,0,0,1,.613-1.887l2.828-2.757a2.131,2.131,0,0,0-1.181-3.635l-3.909-.568a2.133,2.133,0,0,1-1.6-1.166L13.911,3.056a2.131,2.131,0,0,0-3.822,0L8.341,6.6a2.133,2.133,0,0,1-1.6,1.166l-3.909.568a2.131,2.131,0,0,0-1.181,3.635l2.828,2.757a2.129,2.129,0,0,1,.613,1.887L4.42,20.5A2.131,2.131,0,0,0,7.512,22.75l3.5-1.838A2.135,2.135,0,0,1,12.992,20.912Z"
        fill={start ? "url(#gradient)" : "none"}
        stroke={"url(#gradient)"}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default Card;
