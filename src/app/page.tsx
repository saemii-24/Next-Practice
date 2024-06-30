// import Pokemon from "@/components/Pokemon";

import Card from "@/components/Card";
import Header from "@/components/Header";
import { header } from "@/props/props";
import React from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Home() {
  return (
    <>
      <Header text={header.root} />
      <main className="mt-20 flex justify-center items-center">
        <div className="container grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {arr.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <Card />
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </>
  );
}
