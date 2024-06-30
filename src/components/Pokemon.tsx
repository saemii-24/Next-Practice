import Image from "next/image";
import React from "react";
import { Ball } from "./Card";

const Pokemon = () => {
  return (
    <div className="py-8 flex flex-col items-center justify-center shadow-[0_0_10px_0_rgba(250,204,21,0.3),0_0_10px_0_rgba(236,72,153,0.3)] rounded-lg">
      <div className="w-full px-8 flex items-center text-xs">
        <Ball />
        <div className="ml-2">no.</div>
        <div>001</div>
      </div>
      <div>
        <Image
          src="https://i.namu.wiki/i/eeva6fYyC8T1c1s6NOmsDAKnii5HtTEI-zS2pMgIc-LL-EXjpRsGHzjFNx2uMBMmmK_HYDYhBaiUeLjPQD2nzA.webp"
          width={80}
          height={80}
          alt="Picture of the author"
        />
      </div>
      <div>
        <button
          type="button"
          className="mt-5 bg-yellow-300 px-2 py-[0.1rem] rounded-md text-xs font-bold"
        >
          전기
        </button>
      </div>
      <div className="mt-4 text-xl font-bold">피카츄</div>
    </div>
  );
};

export default Pokemon;
