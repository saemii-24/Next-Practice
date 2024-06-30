"use client";
//https://qiita.com/sueasen/items/2a39e709ffac6ff041f5
import Header from "@/components/Header";
import Pokemon from "@/components/Pokemon";
import { header } from "@/props/props";
import { useEffect, useRef, useState } from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Home() {
  const pokemonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [nowSelect, setNowSelect] = useState<HTMLDivElement | null>(null);

  const handleRef = (index: number) => (element: HTMLDivElement | null) => {
    pokemonRefs.current[index] = element;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setNowSelect(e.currentTarget);
  };

  useEffect(() => {
    console.log(pokemonRefs);
  }, []);

  return (
    <>
      <Header text={header.start} />
      <main className="mt-20 flex justify-center items-center">
        <div className="container grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {arr.map((item, i) => {
            return (
              <div
                key={i}
                draggable
                className={`cursor-pointer ${i}`}
                ref={handleRef(i)}
                onClick={handleClick}
              >
                <Pokemon num={i + 1} />
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
