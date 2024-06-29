// import Pokemon from "@/components/Pokemon";

import Card from "@/components/Card";
import Header from "@/components/Header";
import { header } from "@/props/props";

export default function Home() {
  return (
    <>
      <Header text={header.root} />
      <main>
        {/* <Pokemon /> */}
        <Card />
      </main>
    </>
  );
}
