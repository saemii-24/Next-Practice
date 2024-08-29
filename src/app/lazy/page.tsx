"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Acomp } from "../../components/Comp";

Acomp;

// Client Components:
const ComponentA = dynamic(() => import("../../components/Comp"));
const ComponentB = dynamic(() => import("../../components/Comp"));
const ComponentC = dynamic(() => import("../../components/Comp"), {
  ssr: false,
});

export default function ClientComponentExample() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      {/* Load immediately, but in a separate client bundle */}
      <ComponentA />

      {/* Load on demand, only when/if the condition is met */}
      {showMore && <ComponentB />}
      <button onClick={() => setShowMore(!showMore)}>Toggle</button>

      {/* Load only on the client side */}
      <ComponentC />
    </div>
  );
}
