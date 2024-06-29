// import Pokemon from "@/components/Pokemon";

import Card from "@/components/Card";
import Header from "@/components/Header";
import { header } from "@/props/props";

export default function Home() {
  return (
    <>
      <Header text={header.root} />
      <main className="mt-20 flex justify-center items-center">
        <div className="container grid grid-cols-3 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </>
  );
}
