"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

// Client Components:
const ComponentA = dynamic(() => import("../../components/Acomp"));
const ComponentB = dynamic(() => import("../../components/Bcomp"));
const ComponentC = dynamic(() => import("../../components/Ccomp"));
const ComponentD = dynamic(() => import("../../components/Dcomp"));

export default function ClientComponentExample() {
  const [showMore, setShowMore] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 1,
  });

  console.log(inView);

  return (
    <div>
      {/* Load immediately, but in a separate client bundle */}
      <ComponentA />
      <div className="bg-gray-100 h-[200vh] w-30"></div>

      {/* Load on demand, only when/if the condition is met */}
      {showMore && <ComponentB />}
      <button onClick={() => setShowMore(!showMore)}>Toggle</button>

      {/* Load only on the client side */}
      <div ref={ref} className="size-30 bg-green-500"></div>
      {inView && <ComponentC />}

      <ComponentD />
    </div>
  );
}
